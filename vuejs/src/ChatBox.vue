<template>
  <div>
    <div class="fixed-chat-window">
      <button class="btn" v-b-toggle.collapse-window @click="changeCollapse">
        <span v-if="!isCollapsed">Afficher le chat</span>
        <span v-else><i class="fas fa-comment-alt"></i></span>
        <span class="btn__bg"></span>
      </button>
      <b-collapse id="collapse-window" style="width: 500px;">
        <div class="card">
          <div v-if="!currentReceiver" class="card-header">
            <b-row align-h="center">
              <b-col align-self="center" class="px-1" cols="auto">
                Chat en temps réel
              </b-col>
              <b-col class="px-1" cols="auto">
                <b-form-select size="sm" v-model="selectUser" style="max-width: 200px;">
                  <template #first>
                    <b-form-select-option :value="null" disabled>Nouvelle conversation</b-form-select-option>
                  </template>
                  <b-form-select-option v-for="(elt, index) in users" :key="index" :value="elt">{{ elt.nom }}</b-form-select-option>
                </b-form-select>
                <b-button v-if="selectUser" size="sm" variant="outline-dark" @click="setNewUser">Add</b-button>
              </b-col>
            </b-row>
          </div>
          <div v-else class="card-header">
            <b-row align-h="center">
              <b-col align-self="center" class="px-1" cols="auto">
                {{ UserToName(currentReceiver) }}
              </b-col>
              <b-col class="px-1" cols="auto">
                <b-button size="sm" variant="outline-dark" @click="currentReceiver = null">Back</b-button>
              </b-col>
            </b-row>
          </div>
          <div v-if="!currentReceiver" class="card-body py-1 px-2" style="max-height: 400px; overflow-y: auto;">
            <div v-if="receiverList.length > 0">
              <div class="card my-2" v-for="(elt, index) in receiverList" :key="index">
                <div class="card-body py-2 px-2">
                  <b-row align-h="center">
                    <b-col align-self="center" class="px-1" cols="auto">
                      {{ UserToName(elt) }}
                    </b-col>
                    <b-col class="px-1" cols="auto">
                      <b-button size="sm" variant="outline-dark" @click="currentReceiver = elt">See</b-button>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
            <div v-else class="card my-2">
              <div class="card-body py-2 px-2">
                Pas de conversations
              </div>
            </div>
          </div>
          <div v-else class="card-body py-1 px-2 d-flex justify-content-center align-items-center" style="max-height: 410px;">
            <b-row class="px-2" align-h="center" style="width: 490px; max-height: 400px; overflow-y: auto;">
              <b-col v-if="currentReceiverList.length > 0" align-self="center" class="px-0 py-0" cols="11">
                <b-row v-for="(elt, index) in currentReceiverList" :key="index" :align-h="getSender(elt)">
                  <b-col cols="8">
                    <div class="card my-2">
                      <div class="card-body py-2 px-2">
                        <b-row align-h="center">
                          <b-col class="px-1" cols="auto">
                            <span v-if="getUser(elt)">Moi:</span>
                            <span v-else>{{ UserToName(currentReceiver) }}:</span><br><br>
                            <span>{{ elt.message }}</span><br><br>
                            <span>à {{ new Date(Date.parse(elt.time)).getHours() }}h{{ new Date(Date.parse(elt.time)).getMinutes() }}
                              le {{ new Date(Date.parse(elt.time)).getDate() }}/{{ new Date(Date.parse(elt.time)).getMonth()+1 }}/{{ new Date(Date.parse(elt.time)).getFullYear() }}</span>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col v-else align-self="center" class="px-0 py-5" cols="11">
                Envoyer un message à {{ UserToName(currentReceiver) }}
              </b-col>
            </b-row>
          </div>
          <div class="card-footer">
            <form v-if="currentReceiver" @submit.prevent="sendMessage">
              <b-row align-h="center">
                <b-col class="px-1" cols="auto">
                  <b-form-input v-model="message" size="sm" placeholder="Entrer votre message..."></b-form-input>
                </b-col>
                <b-col class="px-1" cols="auto">
                  <button type="submit" class="btn btn-outline-dark">
                    Send
                    <span class="btn__bg"></span>
                  </button>
                </b-col>
              </b-row>
            </form>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import {mapState} from "vuex";
const encryptionKey = process.env.VUE_APP_ENCRYPTION_KEY;
export default {
  props: {
    userId: String,
    userAdmin: String,
  },
  data() {
    return {
      receiver: null,
      message: null,
      messages: [],
      socket: null,
      isCollapsed: false,
      receiverList: [],
      currentReceiver: null,
      currentReceiverList: [],
      users: null,
      selectUser: null,
    }
  },
  mounted() {
    const socket = new WebSocket('ws://localhost:3100');

    socket.addEventListener('open', () => {
      const identificationMessage = {
        type: 'identification',
        userId: this.userId,
        userAdmin: this.userAdmin,
      };
      socket.send(JSON.stringify(identificationMessage));
    });

    socket.addEventListener('message', async event => {
      const data = event.data;
      const message = JSON.parse(data);

      async function getDecryptMessage(ciphertext) {
        const bytes = await CryptoJS.AES.decrypt(ciphertext, encryptionKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
      }

      if (message.type === 'message'){
        const decryptSender = await getDecryptMessage(message.sender);
        const decryptSenderAdmin = await getDecryptMessage(message.senderAdmin);
        const decryptReceiver = await getDecryptMessage(message.receiver);
        const decryptReceiverAdmin = await getDecryptMessage(message.receiverAdmin);
        const decryptMessage = await getDecryptMessage(message.message);
        const decryptTime = await getDecryptMessage(message.time);
        this.messages.push({sender: decryptSender, senderAdmin: decryptSenderAdmin, receiver: decryptReceiver, receiverAdmin: decryptReceiverAdmin, message: decryptMessage, time: decryptTime});
        await this.checkReceiver()
        await this.changeReceiver()
      }
      if (message.type === 'update') {
        this.users = JSON.parse(await getDecryptMessage(message.users));
        this.filterUsers();
      }
    });

    this.socket = socket;
  },
  beforeUnmount() {
    this.socket.close();
  },
  methods: {
    sendMessage() {
      if (this.message !== null && this.message !== ''){
        const message = {
          sender: CryptoJS.AES.encrypt(this.userId, encryptionKey).toString(),
          senderAdmin: CryptoJS.AES.encrypt(this.userAdmin, encryptionKey).toString(),
          receiver: CryptoJS.AES.encrypt(this.currentReceiver.receiver, encryptionKey).toString(),
          receiverAdmin: CryptoJS.AES.encrypt(this.currentReceiver.receiverAdmin, encryptionKey).toString(),
          message: CryptoJS.AES.encrypt(this.message, encryptionKey).toString(),
          time: CryptoJS.AES.encrypt(new Date(new Date().getTime()).toISOString(), encryptionKey).toString(),
        };
        console.log('Message send ! ');
        this.socket.send(JSON.stringify(message));
        this.message = null;
      }
    },
    changeCollapse() {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed){
        const message = {
          type: 'accounts',
          sender: CryptoJS.AES.encrypt(this.userId, encryptionKey).toString(),
          senderAdmin: CryptoJS.AES.encrypt(this.userAdmin, encryptionKey).toString(),
        };
        this.socket.send(JSON.stringify(message));
      }
    },
    async checkReceiver() {
      const receivers = new Set();
      for await (const receiver of this.messages) {
        if (receiver.receiverAdmin === this.userAdmin && receiver.receiver === this.userId) {
          receivers.add(JSON.stringify({
            receiver: receiver.sender,
            receiverAdmin: receiver.senderAdmin,
          }));
        } else if (receiver.senderAdmin === this.userAdmin && receiver.sender === this.userId){
          receivers.add(JSON.stringify({
            receiver: receiver.receiver,
            receiverAdmin: receiver.receiverAdmin,
          }));
        }
      }
      this.receiverList = Array.from(receivers).map(JSON.parse);
    },
    getSender(elt) {
      return elt.sender === this.userId && elt.senderAdmin === this.userAdmin ? 'end' : 'start'
    },
    async changeReceiver(){
      let receivers = []
      for await (const receiver of this.messages) {
        if ((receiver.receiver === this.currentReceiver.receiver && receiver.receiverAdmin === this.currentReceiver.receiverAdmin)
            || (receiver.receiver === this.userId && receiver.receiverAdmin === this.userAdmin && receiver.sender === this.currentReceiver.receiver && receiver.senderAdmin === this.currentReceiver.receiverAdmin)) {
          receivers.unshift(receiver)
        }
      }
      this.currentReceiverList = receivers
    },
    getUser(elt){
      return elt.sender === this.userId && elt.senderAdmin === this.userAdmin
    },
    setNewUser(){
      this.currentReceiver = {
        receiver: this.selectUser.id.toString(),
        receiverAdmin: this.selectUser.admin === null ? "" : this.selectUser.admin
      }
    },
    UserToName(elt) {
      if (!this.users) return null;
      let result = null;
      result = this.users.find(user => {
        const admin = user.admin === null ? "" : user.admin
        return (user.id.toString() === elt.receiver && admin === elt.receiverAdmin) || (user.id.toString() === elt.sender && admin === elt.senderAdmin)
      });
      if (result.nom) return result.nom;
      else return null;
    },
    filterUsers(){
      this.users = this.users.filter(elt => {
        const admin = elt.admin === null ? "" : elt.admin
        return !(elt.id.toString() === this.userId && admin === this.userAdmin)
      })
    }
  },
  watch: {
    async currentReceiver() {
      if (!this.currentReceiver) return
      let receivers = []
      for await (const receiver of this.messages) {
        if ((receiver.receiver === this.currentReceiver.receiver && receiver.receiverAdmin === this.currentReceiver.receiverAdmin)
            || (receiver.receiver === this.userId && receiver.receiverAdmin === this.userAdmin && receiver.sender === this.currentReceiver.receiver && receiver.senderAdmin === this.currentReceiver.receiverAdmin)) {
          receivers.unshift(receiver)
        }
      }
      this.currentReceiverList = receivers
    }
  }
};
</script>
<style scoped>
.fixed-chat-window {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fa-comment-alt:before {
  content: "\f27a";
}

.btn {
  display: inline-block !important;
  position: relative !important;
  padding: 6px 12px !important;
  color: #393e46 !important;
  font-size: 12px !important;
  font-family: "Montserrat Black",serif !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  border: none !important;
  cursor: pointer !important;
  overflow: hidden !important;
}

.btn__bg {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: transparent !important;
  z-index: -1 !important;
  transition: background-color 0.5s ease-in-out !important;
}

.btn:hover .btn__bg {
  background-color: #393e46 !important;
}

.btn:hover{
  color: white !important;
}

</style>