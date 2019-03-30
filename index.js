const Response = require('./class/Response')
const ObjectId = require('bson').ObjectId;

class Util {
	constructor() {
        this.Response = new Response()
    }
    
    async init() {
        // console.log('Util Init')
    }

    /* 
        Get classname from ES6 module or require
        Whilte importing async/await like const demo = import("../demo") -> ES6 it returns classname in c.default
        but when we require demo = rqeuire("../demo") then it return direct classname
    */
    // getClass = (c) => {
    //     const ClassNew = c.__esModule ? c.default : c
    //     return ClassNew
    // }

    isset(obj) {
        var dump;
        if(undefined==obj) return false
        
        return true;
    }

    isEmpty(obj) {
        if(undefined==obj) return true
        
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return JSON.stringify(obj) === JSON.stringify({});
    }

    objValue(obj, props=[], defaultValue = null) {
        if(undefined==obj || this.isEmpty(obj)) return defaultValue
        
        props.forEach(element => {
            // console.log(element, obj)
            if(undefined==obj || this.isEmpty(obj) || !obj.hasOwnProperty(element)) {
                obj = defaultValue
                return
            }
            // console.log(obj, element, obj.hasOwnProperty(element))
            obj = obj[element];

            // console.log(defaultValue)
            
        });
        
        return obj
    }

    hashCode(str){
        var hash = 5381,
        i    = str.length;
  
        while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
        }
    
        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
        * integers. Since we want the results to be always positive, convert the
        * signed int to an unsigned by doing an unsigned bitshift. */
        return hash >>> 0;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
    }

    slugify(text) {
	  return text.toString().toLowerCase()
	    .replace(/\s+/g, '-')           // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
	    .replace(/^-+/, '')             // Trim - from start of text
	    .replace(/-+$/, '');            // Trim - from end of text
    }
    
    isObjectId(val) {
        // console.log("AMAM", val)
        if (ObjectId.isValid(val)) {
            return true
        }

        return false
    }
}

// module.exports = new Util()
module.exports = () => new Util()