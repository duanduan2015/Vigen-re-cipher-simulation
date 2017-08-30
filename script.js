class CaesarEncoder {
    constructor(keyword) {
        this.keyword = keyword;
    }

    getKeyword() {
        return this.keyword;
    }

    internalCode(c) {
        return c.charCodeAt(0) - 'A'.charCodeAt(0);
    }

    encodeChar(c, pos) {
        if (this.keyword.length == 0) return '?';

        var codeOfA = 'A'.charCodeAt(0);
        pos = pos % this.keyword.length;

        return String.fromCharCode(codeOfA + (
            (this.keyword.charCodeAt(pos) - codeOfA) +
            (c.charCodeAt(0) - codeOfA)
        ) % 26);
    }

    encodeText(plain) {

        var encodedChars = [];
        for (var i = 0; i < plain.length; i++) {
            encodedChars.push(this.encodeChar(plain[i], i));
        }
        return encodedChars.join('');
    }
}
class Caesar extends React.Component {
    constructor(props) {
        super(props);
        var initKey = "SNAKE";
        var initText = "HELLO";
        this.state = {
            key: initKey,
            editingKey : initKey,
            plainText: initText,
            encryptedText: new CaesarEncoder(initKey).encodeText(initText),
        };
        this.getEncryptedText = this.getEncryptedText.bind(this);
        this.editCaesarKey = this.editCaesarKey.bind(this);
        this.clearPlainText = this.clearPlainText.bind(this);
    }
    

    getEncryptedText(event) {
        this.updateEncoding(this.state.plainText, this.state.editingKey.replace(/[^A-Za-z]/g, '').toUpperCase());
        this.state.key = this.state.key;
        this.state.encryptedText = new CaesarEncoder(this.state.key).encodeText(this.state.plainText);
    }

    updateCaesarKey(e) {
        e.preventDefault();
        this.updateEncoding(this.state.plainText, this.state.editingKey.replace(/[^A-Za-z]/g, '').toUpperCase());
    }
    
    editCaesarKey(event) {
        this.setState({editingKey: event.target.value});
    }

    clearPlainText(event) {
        this.setState({plainText:''});
    }

    appendPlainText(c, e) {
        this.updateEncoding(this.state.plainText + c, this.state.key);
    }

    renderKeypad() {
        var keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var encoder = new CaesarEncoder(this.state.key);
        return (
                <table>
                <tr>
                    {keys.split('').map(c => (<td><button className="keypad" onClick={this.appendPlainText.bind(this, c)}>{c}</button></td>))}
                </tr>
                <tr>
                    {keys.split('').map(c => (<td>{encoder.encodeChar(c, this.state.plainText.length)}</td>))}
                </tr>
                </table>
               )

    }

    updateEncoding(newPlainText, newKey) {
        var encoder = new CaesarEncoder(newKey);
        this.setState({
            key: newKey,
            plainText: newPlainText,
            encryptedText: encoder.encodeText(newPlainText),
        });
    }

    renderCaesarKeyTabular(key) {
        var charRow = [];
        var codeRow = [];
        var encoder = new CaesarEncoder(key);

        for (var i = 0; i < key.length; i++) {
            charRow.push(<td>{key.charAt(i)}</td>);
            codeRow.push(<td>{encoder.internalCode(key.charAt(i))}</td>);
        }
        return (
            <table>
                <tr>{charRow}</tr>
                <tr>{codeRow}</tr>
            </table>
        )
    }

    render() {
        return <div>
            <h1>Configuration</h1>
            <h2>Keyword</h2>
            <label>
            Name:
            <input type="text" value={this.state.editingKey} onChange={this.editCaesarKey} />
            </label>
            <input type="submit" value="Update" onClick={this.getEncryptedText} />
            {this.renderCaesarKeyTabular(this.state.key)}
            <h1>Encoding</h1>
            <h2>Source Text</h2>
            {this.renderKeypad()}
            <input value={this.state.plainText} disabled />
            <button onClick={this.clearPlainText}>Clear</button>
            <h2>Cipher Text</h2>
            <input value={this.state.encryptedText} disabled />
            </div>;
    }
}

ReactDOM.render(<Caesar />, document.getElementById('caesar'));
