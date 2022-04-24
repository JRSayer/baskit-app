function hexToRGBa(h: string, a: number) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      const r: string = "0x" + h[1] + h[1];
      const g: string = "0x" + h[2] + h[2];
      const b: string = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      const r: string = "0x" + h[1] + h[2];
      const g: string = "0x" + h[3] + h[4];
      const b: string = "0x" + h[5] + h[6];
    }
    //rgb(r,g,b,a)
    return "rgba("+ +r + "," + +g + "," + +b + "," + +a + ")";
};

export default hexToRGBa;