

exports.popArray = (params) => {
    if(Array.isArray(params)) {
        let newParams = []
        params.forEach(param => {
            if (Array.isArray(param)) param = param.splice(1)[0]
            newParams.push(param)
        })
        return newParams
    }
    else{
        if (Array.isArray(params)) params = params.splice(1)[0]
        return params
    }

}
