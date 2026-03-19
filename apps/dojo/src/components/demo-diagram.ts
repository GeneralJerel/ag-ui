/**
 * Hardcoded beautiful Excalidraw diagram for demo purposes.
 * WebSockets explained as "letters vs phone call" analogy.
 */
export const DEMO_ELEMENTS = JSON.stringify([
  {"type":"cameraUpdate","width":600,"height":450,"x":80,"y":-15},
  {"type":"text","id":"title","x":152,"y":12,"text":"How WebSockets Work","fontSize":28,"strokeColor":"#1e1e1e"},
  {"type":"text","id":"sub","x":148,"y":48,"text":"The difference between letters and a phone call","fontSize":16,"strokeColor":"#757575"},

  {"type":"cameraUpdate","width":800,"height":600,"x":-10,"y":60},

  {"type":"rectangle","id":"old_zone","x":10,"y":80,"width":370,"height":220,"backgroundColor":"#ffc9c9","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#ef4444","strokeWidth":1,"opacity":35},
  {"type":"text","id":"old_lbl","x":28,"y":90,"text":"The Old Way  (Regular Web Request)","fontSize":14,"strokeColor":"#b91c1c"},

  {"type":"rectangle","id":"new_zone","x":10,"y":330,"width":370,"height":220,"backgroundColor":"#d3f9d8","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#22c55e","strokeWidth":1,"opacity":35},
  {"type":"text","id":"new_lbl","x":28,"y":340,"text":"WebSockets  (Live Connection)","fontSize":14,"strokeColor":"#15803d"},

  {"type":"cameraUpdate","width":600,"height":450,"x":0,"y":75},

  {"type":"rectangle","id":"u1","x":40,"y":115,"width":110,"height":55,"backgroundColor":"#a5d8ff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#4a9eed","strokeWidth":2,"label":{"text":"You","fontSize":18}},
  {"type":"rectangle","id":"s1","x":255,"y":115,"width":110,"height":55,"backgroundColor":"#ffd8a8","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#f59e0b","strokeWidth":2,"label":{"text":"Website","fontSize":18}},

  {"type":"arrow","id":"req1","x":150,"y":130,"width":105,"height":0,"points":[[0,0],[105,0]],"strokeColor":"#4a9eed","strokeWidth":2,"endArrowhead":"arrow","label":{"text":"Ask for data","fontSize":14}},
  {"type":"arrow","id":"res1","x":255,"y":158,"width":-105,"height":0,"points":[[0,0],[-105,0]],"strokeColor":"#ef4444","strokeWidth":2,"endArrowhead":"arrow","strokeStyle":"dashed","label":{"text":"Reply  then CLOSE","fontSize":14}},

  {"type":"rectangle","id":"note1","x":40,"y":200,"width":325,"height":36,"backgroundColor":"#fff3bf","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#f59e0b","strokeWidth":1,"opacity":80,"label":{"text":"Like sending a letter. One question, one reply. Connection ends.","fontSize":13}},

  {"type":"cameraUpdate","width":600,"height":450,"x":0,"y":320},

  {"type":"rectangle","id":"u2","x":40,"y":365,"width":110,"height":55,"backgroundColor":"#a5d8ff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#4a9eed","strokeWidth":2,"label":{"text":"You","fontSize":18}},
  {"type":"rectangle","id":"s2","x":255,"y":365,"width":110,"height":55,"backgroundColor":"#b2f2bb","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#22c55e","strokeWidth":2,"label":{"text":"Website","fontSize":18}},

  {"type":"arrow","id":"handshake","x":150,"y":375,"width":105,"height":0,"points":[[0,0],[105,0]],"strokeColor":"#8b5cf6","strokeWidth":2,"endArrowhead":"arrow","label":{"text":"Open connection","fontSize":14}},

  {"type":"arrow","id":"ws1","x":150,"y":408,"width":105,"height":0,"points":[[0,0],[105,0]],"strokeColor":"#22c55e","strokeWidth":2,"endArrowhead":"arrow"},
  {"type":"arrow","id":"ws2","x":255,"y":420,"width":-105,"height":0,"points":[[0,0],[-105,0]],"strokeColor":"#22c55e","strokeWidth":2,"endArrowhead":"arrow"},
  {"type":"arrow","id":"ws3","x":150,"y":432,"width":105,"height":0,"points":[[0,0],[105,0]],"strokeColor":"#22c55e","strokeWidth":2,"endArrowhead":"arrow"},

  {"type":"rectangle","id":"note2","x":40,"y":450,"width":325,"height":36,"backgroundColor":"#d3f9d8","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#22c55e","strokeWidth":1,"opacity":80,"label":{"text":"Like a phone call. Talk anytime, in both directions.","fontSize":13}},

  {"type":"cameraUpdate","width":800,"height":600,"x":360,"y":60},

  {"type":"rectangle","id":"uses_zone","x":420,"y":80,"width":330,"height":490,"backgroundColor":"#e5dbff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":1,"opacity":35},
  {"type":"text","id":"uses_lbl","x":438,"y":90,"text":"Where WebSockets Shine","fontSize":14,"strokeColor":"#6d28d9"},

  {"type":"rectangle","id":"uc1","x":445,"y":120,"width":275,"height":55,"backgroundColor":"#d0bfff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"Live Chat Apps","fontSize":17}},
  {"type":"rectangle","id":"uc2","x":445,"y":195,"width":275,"height":55,"backgroundColor":"#d0bfff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"Stock Price Updates","fontSize":17}},
  {"type":"rectangle","id":"uc3","x":445,"y":270,"width":275,"height":55,"backgroundColor":"#d0bfff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"Multiplayer Games","fontSize":17}},
  {"type":"rectangle","id":"uc4","x":445,"y":345,"width":275,"height":55,"backgroundColor":"#d0bfff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"Live Sports Scores","fontSize":17}},
  {"type":"rectangle","id":"uc5","x":445,"y":420,"width":275,"height":55,"backgroundColor":"#d0bfff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"AI Streaming Replies","fontSize":17}},

  {"type":"cameraUpdate","width":1200,"height":900,"x":-20,"y":20}
]);
