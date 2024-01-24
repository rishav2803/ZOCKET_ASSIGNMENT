export default class Canvas {
  constructor(canvasRef, templateData, bgImg, caption, cta, color) {
    this.canvasRef = canvasRef;
    this.ctx = this.canvasRef.current.getContext("2d");
    this.templateData = templateData;
    this.caption = caption;
    this.cta = cta;
    this.bgImg = bgImg;
    this.color = color;
    this.drawCanvas();
  }

  drawCanvas() {
    this.clearCanvas();
    this.drawBgColor(this.color);
    this.drawDesignPattern();
    this.drawImageMask(this.bgImg);
    this.drawCaption(this.caption);
    this.drawCTA(this.cta);
  }

  updateCanvas(caption, cta, bgImg, color) {
    this.clearCanvas();
    this.drawBgColor(color);
    this.drawDesignPattern();
    this.drawImageMask(bgImg);
    this.drawCaption(caption);
    this.drawCTA(cta);
  }

  drawBgColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
  }

  clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
  }

  drawDesignPattern() {
    const img = new Image();
    img.src = this.templateData.urls.design_pattern;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
    };
  }

  drawMaskStroke() {
    const img = new Image();
    img.src = this.templateData.urls.stroke;
    const { x, y, width, height } = this.templateData.image_mask;
    img.onload = () => {
      this.ctx.drawImage(img, x, y, width, height);
    };
  }

  drawCaption(caption) {
    const {
      text,
      position,
      font_size,
      text_color,
      max_characters_per_line,
      alignment,
    } = this.templateData.caption;
    this.ctx.fillStyle = text_color;
    this.ctx.font = `${font_size}px Arial`;
    this.ctx.textAlign = alignment;

    const lines = this.breakTextIntoLines(
      caption.length == 0 ? text : caption,
      max_characters_per_line
    );
    let offsetY = position.y + 50;

    lines.forEach((line) => {
      this.ctx.fillText(line, position.x + 10, offsetY);
      offsetY += font_size;
    });
  }

  breakTextIntoLines(text, maxCharactersPerLine) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const potentialLine = currentLine ? `${currentLine} ${word}` : word;

      if (potentialLine.length <= maxCharactersPerLine) {
        currentLine = potentialLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  drawCTA(cta) {
    const {
      text,
      position,
      font_size = 30,
      text_color,
      background_color,
    } = this.templateData.cta;
    const textWidth = this.ctx.measureText(cta.length == 0 ? text : cta).width;
    const adjustedX = position.x - 20;
    const adjustedY = position.y - 50;
    console.log(cta);

    this.ctx.beginPath();
    this.ctx.roundRect(
      adjustedX - textWidth / 2 - 5,
      adjustedY - font_size / 2 - 12,
      textWidth + 10,
      font_size + 24,
      [40]
    );

    this.ctx.fillStyle = background_color;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = `${font_size}px Arial`;
    this.ctx.fillStyle = text_color;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(cta.length == 0 ? text : cta, adjustedX, adjustedY);
  }

  drawImageMask(bgImg) {
    const { x, y, width, height } = this.templateData.image_mask;
    const maskImg = new Image();
    maskImg.src = this.templateData.urls.mask;
    const img = new Image();
    img.src = bgImg;

    //wait for both the image to load
    maskImg.onload = () => {
      img.onload = () => {
        console.log(img);
        //create a temp canvas to cretate something like a mask group
        //of just of the mask and the img
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.canvasRef.current.width;
        tempCanvas.height = this.canvasRef.current.height;
        const tempCtx = tempCanvas.getContext("2d");

        tempCtx.drawImage(maskImg, x, y, width, height);
        tempCtx.globalCompositeOperation = "source-in";
        tempCtx.drawImage(img, x, y, width, height);
        tempCtx.globalCompositeOperation = "source-over";
        this.drawMaskStroke();

        //draw the temp canvas over the og canvas
        this.ctx.drawImage(tempCanvas, 0, 0);
      };
    };
  }
}
