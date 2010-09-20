

hexy = function (buffer, config) {
  config = config || {}
  var h = new Hexy(buffer, config)
  return h.toString()
}

Hexy = function (buffer, config) {
  var self = this
 
  self.buffer    = buffer // magic string conversion here?
  self.width     = config.width || 16
  self.numbering = config.numbering == "none"  ? "none" : "hex_bytes"
   
  switch (config.format) {
    case "none":
    case "fours":
      self.format = config.format
      break
    default:
      self.format = "twos"
  }
  
  self.caps      = config.caps      == "upper" ? "upper" : "lower"
  self.annotate  = config.annotate  == "none"  ? "none"  : "ascii"
  self.prefix    = config.prefix    || ""
  self.indent    = config.indent    || 0

  for (var i = 0; i!=self.indent; ++i) {
    self.prefix = " "+prefix
  }

  var pos = 0

  this.toString = function () {
    var str = ""
    
    //split up into line of max `self.width`
    var line_arr = lines()
    
    //lines().forEach(function(hex_raw, i){
    for (var i = 0; i!= line_arr.length; ++i) {
      var hex_raw = line_arr[i],
          hex = hex_raw[0],
          raw = hex_raw[1]
      //insert spaces every `self.format.twos` or fours
      var howMany = hex.length
      if (self.format === "fours") {
        howMany = 4
      } else if (self.format === "twos") {
        howMany = 2
      }

      var hex_formatted = ""
      for (var j =0; j< hex.length; j+=howMany) {
        var s = hex.substr(j, howMany)
        hex_formatted += s + " "
      }
      str += self.prefix 

      if (self.numbering === "hex_bytes") {
        str += pad(i*self.width, 8) // padding...
        str += ": "
      }
      
      var padlen = 0
      switch(self.format) {
        case "fours":
          padlen = self.width*2 + self.width/2
          break
        case "twos":
          padlen = self.width*3 + 2
          break
        default:
          padlen = self * 2
      }

      str += rpad(hex_formatted, padlen)
      if (self.annotate === "ascii") {
        str+=" "
        str+=raw.replace(/[\000-\040\177-\377]/g, ".")
      }
      str += "\n"
    }
    return str
  }

  var lines = function() {
    var hex_raw = []
    

    for (var i = 0; i<self.buffer.length ; i+=self.width) {
      var begin = i,
          end   = i+self.width >= buffer.length ? buffer.length : i+self.width,
          slice = buffer.slice(begin, end),
          hex   = self.caps === "upper" ? hexu(slice) : hexl(slice),
          raw   = slice.toString('ascii')

      hex_raw.push([hex,raw])
    }
    return hex_raw

  }

  var hexl = function (buffer) {
    var str = ""
    for (var i=0; i!=buffer.length; ++i) {
      str += pad(buffer[i], 2)
    }
    return str
  }
  var hexu = function (buffer) {
    return hexl(buffer).toUpperCase()
  }

  var pad = function(b, len) {
    var s = b.toString(16)
    
    while (s.length < len) {
      s = "0" + s
    }
    return s
  } 
  var rpad = function(s, len) {
    while(s.length < len) {
      s += " "
    }
    return s
  }

}

var fs = require('fs'),
    file = process.argv[2]


var data = fs.readFileSync(file)
//console.log(hexy(data))
var format = {}
//format.format = "fours"
format.caps   = "upper"
format.annotate = "none"
//format.numbering = "none"
format.width = 8
console.log(hexy(data, format))
console.log("doen")

