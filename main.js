function check_and_update_flat(e)
{
    if(e.keyCode == 13)
    {
        e.preventDefault();
        update();
    }
}

function update() {
    let hex = document.getElementById('hex').value;
    if(hex == "" || hex.length != 7)
    {
        alert("Invalid");
        document.getElementById('hex').value = "";
        return;
    }
    let obj = hextorgb(hex);
    let output = net.run(obj);
    document.getElementsByClassName('answer')[0].innerHTML = output.flat > output.notflat ? "Flat color" : "Not flat color";
    document.getElementById('hex').value = "";
    document.getElementsByClassName('wrapper')[0].style.backgroundColor = hex;
}

let net = new brain.NeuralNetwork();

data.map((obj) => {
    obj.input.r = obj.input.r/255;
    obj.input.g = obj.input.g/255;
    obj.input.b = obj.input.b/255;
    return obj;
});

net.train(data);

document.getElementById('submit').addEventListener('click', () => {
    update();
});

function hextorgb(hex) {
    let obj = {r : 0, g : 0, b : 0};
    hex = hex.split('');
    let r = [hex[1], hex[2]],
        g = [hex[3], hex[4]],
        b = [hex[5], hex[6]];
    
    obj.r = parseInt(chartonum(r[0]))*16 + parseInt(chartonum(r[1]));
    obj.g = parseInt(chartonum(g[0]))*16 + parseInt(chartonum(g[1]));
    obj.b = parseInt(chartonum(b[0]))*16 + parseInt(chartonum(b[1]));
    return obj;
}

function chartonum(char) {
    if(char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57)
        return char.charCodeAt(0) - 48;

    else if(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
        return 9 + parseInt(char.charCodeAt(0)) - 64;

    else
    return 9 + parseInt(char.charCodeAt(0)) - 96;
}