export class Text {

    constructor(font, color, align, text) {
        this.font = font;
		this.color = color;
		this.align = align;
		this.text = text;
    }

    draw(canvas, text) {
		text = text||this.text;
		canvas.drawText(text, this.font, this.color, this.align);
    }
}
