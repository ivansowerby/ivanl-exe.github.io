class Stryle {
    constructor(string) {
        this.string = Array.from(string);
        this.styling = [];
    }

    length() {
        return this.string.length;
    }

    replace(index, character) {
        if(character.length != 1) { return null; }
        this.string[index] = character;
    }

    slice(from, to) {
        if(to == 0) { return ''; }
        if(!from) { from = 0; }
        if(!to) { to = this.string.length - 1; }
        let string = new Stryle(
            this.string.slice(from, to).join('')
        );
        string.styling = this.styling;
        return string.export();
    }

    style(style, indices) {
        for(let i = 0; i < this.styling.length; i++) {
            if(this.styling[i]['style'] == style) {
                this.styling[i]['indices'] = indices;
            }
        }

        this.styling.push({
            'style': style,
            'indices': indices
        });
    }

    unstyle(style) {
        for(let i = 0; i < this.styling.length; i++) {
            if(this.styling[i]['style'] == style) {
                this.styling.splice(i, 1);
            }
        }
    }

    color(color, indices) {
        this.style('color:' + color + ';', indices);
    }

    uncolor(color) {
        this.unstyle('color:' + color + ';');
    }

    import(string) {
        this.string = Array.from(string);
    }

    export() {
        let string = structuredClone(this.string);
        
        let i = 0;
        while(i < this.styling.length) {
            let style = this.styling[i];
            let indices = style['indices'].sort(
                function(a, b) {
                    return a - b;
                }
            ).filter(
                function(c) {
                    return c < string.length;
                }
            );

            let j = 0;
            let index = 0;
            while(j < indices.length) {
                index = indices[j];
                if(j < 1 || string[j - 1].includes('</span>')) {
                    string[index] = this.#openSpan(index, style['style']);
                    if(indices[j - 1] != index - 1 && indices[j + 1] != index + 1) {
                        string[index] += '</span>';
                    }
                }
                else if(indices[j + 1] != index + 1) {
                    string[index] = this.#closeSpan(index);
                }
                j++;
            }
            i++;
        }
        return string.join('');
    }

    #openSpan(index, style) {
        return '<span style="' + style + '">' + this.string[index];
    }

    #closeSpan(index) {
        return this.string[index] + '</span>' 
    }

    applyTo(id) {
        document.getElementById(id).innerHTML = this.export();
    }
}