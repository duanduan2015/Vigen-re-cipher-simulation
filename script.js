class Caeser extends React.Component {
    constructor(props) {
        super(props);
        var initKey = "SNAKE";
        var initText = "HELLO";
        this.state = {
            key: initKey,
            editingKey : initKey,
            plainText: initText,
            encryptedText: "Faked",
        };
        this.getEncryptedText = this.getEncryptedText.bind(this);
        this.editCaesarKey = this.editCaesarKey.bind(this);
        this.clearPlainText = this.clearPlainText.bind(this);
    }
    
    getEncryptedText(event) {
        console.log("key is: " + this.state.key);
        console.log("encrypted text is: " + this.state.encryptedText);
    }

    editCaesarKey(event) {
        this.setState({key: event.target.value});
    }

    clearPlainText(event) {
        this.setState({plainText:''});
    }

    render() {
        return <div>
            <h1>Configuration</h1>
            <h2>Keyword</h2>
            <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" onClick={this.getEncryptedText} />
            <h1>Encoding</h1>
            <h2>Source Text</h2>
            <input value={this.state.plainText} disabled />
            <button onClick={this.clearPlainText}>Clear</button>
            <h2>Cipher Text</h2>
            <input value={this.state.encryptedText} disabled />
            </div>;
    }
}

ReactDOM.render(<Caeser />, document.getElementById('caesar'));
