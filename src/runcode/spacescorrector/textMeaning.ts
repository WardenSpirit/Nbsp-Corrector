interface TextMeaning {
    follow(context: Context, text: string): void
}

class Correction implements TextMeaning {

    private startIndex: number

    constructor(context: Context) {
        this.startIndex = context.getIndex()
    }

    public follow(context: Context, text: string): void {

        if (text.substring(context.getIndex(), context.getIndex() + 4) == "<!--") {
            context.addTextPart([text.substring(this.startIndex, context.getIndex()), this.startIndex])
            context.setState(new CommentInCorrection())
            context.incrementIndex(4)
            return
        }
        else if (text.substring(context.getIndex(), context.getIndex() + 1) == "<") {
            context.addTextPart([text.substring(this.startIndex, context.getIndex()), this.startIndex])
            context.setState(new Tag())
            context.incrementIndex(1)
            return
        }
        else if (context.getIndex() == text.length) {
            context.addTextPart([text.substring(this.startIndex, context.getIndex()), this.startIndex])
            return
        }
        else context.incrementIndex(1)
    }
}

class Tag implements TextMeaning {
    public follow(context: Context, text: string): void {

        if (text.substring(context.getIndex(), context.getIndex() + 4) == "<!--") {
            context.setState(new CommentInTag())
            context.incrementIndex(4)
            return
        }
        else if (text.substring(context.getIndex(), context.getIndex() + 1) == ">") {
            context.incrementIndex(1)
            context.setState(new Correction(context))
            return
        }
        else if (text.substring(context.getIndex(), context.getIndex() + 1) == "\"" || text.substring(context.getIndex(), context.getIndex() + 1) == "\'") {
            context.setState(new Attribute())
            context.incrementIndex(1)
            return
        }
        else if (text.substring(context.getIndex(), context.getIndex() + 1) == "\\") {
            context.incrementIndex(2)
            return
        }
        else context.incrementIndex(1)
    }
}

class CommentInTag implements TextMeaning {

    public follow(context: Context, text: string): void {

        if (text.substring(context.getIndex(), context.getIndex() + 3) == "-->") {
            context.incrementIndex(3)
            context.setState(new Tag())
            return
        }
        else context.incrementIndex(1)
    }
}

class CommentInCorrection implements TextMeaning {

    public follow(context: Context, text: string): void {

        if (text.substring(context.getIndex(), context.getIndex() + 3) == "-->") {
            context.incrementIndex(3)
            context.setState(new Correction(context))
            return
        }
        else context.incrementIndex(1)
    }
}

class Attribute implements TextMeaning {
    public follow(context: Context, text: string): void {

        if (text.substring(context.getIndex(), context.getIndex() + 1) == "\"" || text.substring(context.getIndex(), context.getIndex() + 1) == "\'") {
            context.incrementIndex(1)
            context.setState(new Tag())
            return
        }
        else if (text.substring(context.getIndex(), context.getIndex() + 1) == "\\") {
            context.incrementIndex(2)
            return
        }
        else context.incrementIndex(1)
    }
}

export class Context {
    private index: number
    private state: TextMeaning
    private textParts: [textPart: string, offset: number][] = []

    constructor(offset: number) {
        this.index = offset
        this.state = new Correction(this)
    }

    public setState(state: TextMeaning): void {
        this.state = state
    }

    public getIndex(): number {
        return this.index
    }
    public incrementIndex(increment: number) {
        this.index += increment
    }

    public addTextPart(textPart: [textPart: string, offset: number]) {
        this.textParts.push(textPart)
    }

    public generateTextParts(text: string): [textPart: string, offset: number][] {
        while (this.index < text.length) {
            this.state.follow(this, text)
        }
        return this.textParts
    }
}