var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var fs = require('fs');
var shell = require('shelljs');
var nodemailer = require('nodemailer');
var txutils = lightwallet.txutils;

var smtpTransport = nodemailer.createTransport("SMTP", {  
    service: 'Gmail',
    auth: {
        user: 'zerobugplz@gmail.com',
        pass: 'qwer123!!'
    }
});

var web3 = new Web3(
    new Web3.providers.HttpProvider('http://127.0.0.1:8545')
);
var address = '0xD1327ffe8765732Ff675d7B533f7AAD93053739b';
var key = '609378169defc198fd60738d298e69840b78e721e8b4a15cc45e95e142bc2a9b';

var bytecode = '60806040523480156200001157600080fd5b50620f4240600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620f42406000819055506040805190810160405280601681526020017f4b6f6f6b6d696e20536563757269747920546f6b656e0000000000000000000081525060079080519060200190620000b092919062000172565b506012600860006101000a81548160ff021916908360ff1602179055506040805190810160405280600381526020017f4b53540000000000000000000000000000000000000000000000000000000000815250600990805190602001906200011a92919062000172565b5033600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600181905550600060028190555062000221565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001b557805160ff1916838001178555620001e6565b82800160010185558215620001e6579182015b82811115620001e5578251825591602001919060010190620001c8565b5b509050620001f59190620001f9565b5090565b6200021e91905b808211156200021a57600081600090555060010162000200565b5090565b90565b61176380620002316000396000f30060806040526004361061013e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063044215c61461014857806306fdde03146101b5578063095ea7b31461024557806316f66e55146102aa57806318160ddd146102d557806323b872dd1461030057806327e235e3146103855780632a2a3284146103dc578063313ce56714610407578063446a37e0146104385780635c65816514610497578063664e97041461050e57806370a082311461053957806378a89567146105905780638da5cb5b146105bb578063933e16af1461061257806395d89b411461066d5780639f181b5e146106fd578063a9059cbb14610728578063b44272631461078d578063baf8b45914610797578063c948e47b146107f6578063dc369a661461085f578063dd62ed3e146108cc575b610146610943565b005b34801561015457600080fd5b5061017360048036038101908080359060200190929190505050610a86565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101c157600080fd5b506101ca610ab9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561020a5780820151818401526020810190506101ef565b50505050905090810190601f1680156102375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561025157600080fd5b50610290600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b57565b604051808215151515815260200191505060405180910390f35b3480156102b657600080fd5b506102bf610c49565b6040518082815260200191505060405180910390f35b3480156102e157600080fd5b506102ea610c4f565b6040518082815260200191505060405180910390f35b34801561030c57600080fd5b5061036b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c55565b604051808215151515815260200191505060405180910390f35b34801561039157600080fd5b506103c6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611010565b6040518082815260200191505060405180910390f35b3480156103e857600080fd5b506103f1611028565b6040518082815260200191505060405180910390f35b34801561041357600080fd5b5061041c611032565b604051808260ff1660ff16815260200191505060405180910390f35b34801561044457600080fd5b50610479600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611045565b60405180826000191660001916815260200191505060405180910390f35b3480156104a357600080fd5b506104f8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061108e565b6040518082815260200191505060405180910390f35b34801561051a57600080fd5b506105236110b3565b6040518082815260200191505060405180910390f35b34801561054557600080fd5b5061057a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506110b9565b6040518082815260200191505060405180910390f35b34801561059c57600080fd5b506105a5611102565b6040518082815260200191505060405180910390f35b3480156105c757600080fd5b506105d061110c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561061e57600080fd5b50610653600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611132565b604051808215151515815260200191505060405180910390f35b34801561067957600080fd5b50610682611289565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106c25780820151818401526020810190506106a7565b50505050905090810190601f1680156106ef5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561070957600080fd5b50610712611327565b6040518082815260200191505060405180910390f35b34801561073457600080fd5b50610773600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061132d565b604051808215151515815260200191505060405180910390f35b610795610943565b005b3480156107a357600080fd5b506107d8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611522565b60405180826000191660001916815260200191505060405180910390f35b34801561080257600080fd5b50610845600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560001916906020019092919050505061153a565b604051808215151515815260200191505060405180910390f35b34801561086b57600080fd5b5061088a60048036038101908080359060200190929190505050611606565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156108d857600080fd5b5061092d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611643565b6040518082815260200191505060405180910390f35b6000803411151561095357600080fd5b61096861c350346116ca90919063ffffffff16565b90506109bc81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461170290919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a148160005461170290919063ffffffff16565b600081905550600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610a82573d6000803e3d6000fd5b5050565b60056020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b4f5780601f10610b2457610100808354040283529160200191610b4f565b820191906000526020600020905b815481529060010190602001808311610b3257829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60025481565b60005481565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610d265750828110155b8015610d325750600083115b1515610d3d57600080fd5b610d8f83600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461170290919063ffffffff16565b600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610e2483600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461171e90919063ffffffff16565b600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811015610f9f57610f1e83600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461171e90919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b60036020528060005260406000206000915090505481565b6000600254905090565b600860009054906101000a900460ff1681565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6004602052816000526040600020602052806000526040600020600091509150505481565b61c35081565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600154905090565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008061115e6002546111506001805461170290919063ffffffff16565b61171e90919063ffffffff16565b90506111756001805461170290919063ffffffff16565b6001819055508260056000600154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061122181600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461170290919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506112798160005461170290919063ffffffff16565b6000819055506001915050919050565b60098054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561131f5780601f106112f45761010080835404028352916020019161131f565b820191906000526020600020905b81548152906001019060200180831161130257829003601f168201915b505050505081565b60015481565b600081600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015801561137e5750600082115b151561138957600080fd5b6113db82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461171e90919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061147082600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461170290919063ffffffff16565b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60066020528060005260406000206000915090505481565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561159857600080fd5b81600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081600019169055506115f6600160025461170290919063ffffffff16565b6002819055506001905092915050565b60006005600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000808314156116dd57600090506116fc565b81830290508183828115156116ee57fe5b041415156116f857fe5b8090505b92915050565b6000818301905082811015151561171557fe5b80905092915050565b600082821115151561172c57fe5b8183039050929150505600a165627a7a72305820ff9247b8b5055943043f00cc123b30b802252bd18460a8f74467089fbe02ea1c0029';
var interface = [{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"analysis","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_result","type":"bytes32"}],"name":"setResult","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_token","type":"address"}],"name":"getResult","outputs":[{"name":"_token_result","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getSmartContract","outputs":[{"name":"token_address","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenCount","outputs":[{"name":"token_count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenDoneCount","outputs":[{"name":"token_done_count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"token_result","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenDone","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

var myContract = web3.eth.contract(interface);
var contractAddress = '0x60c2de96731ba2ce504e70f61e380a9bf256dc43';
var myContractInstance = myContract.at(contractAddress);

function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

var txOptions = {
    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    to: contractAddress
}

// Web3 examples
// var rawTx = txutils.functionTx(interface, 'analysis', ['0x005'], txOptions);
// sendRaw(rawTx);
// var result = myContractInstance.getTokenCount();
// console.log(result)

var getTokenCount = parseInt(myContractInstance.getTokenCount());
var getTokenDoneCount = parseInt(myContractInstance.getTokenDoneCount());

while((getTokenCount-getTokenDoneCount) != 0) {
    getTokenDoneCount = getTokenDoneCount + 1;
    var result = 0;
    var result_string = '';
    var contract_address = myContractInstance.token(getTokenDoneCount);
    var email_to = myContractInstance.getEmail(contract_address);
    try{
        var code = String(web3.eth.getCode(contract_address));
    }
    catch(err){
        var output = "WrongAddress";
        fs.writeFileSync('./output'+String(getTokenDoneCount)+'.txt', output, function(err){
            if(err) {
                return console.log(err);
            }
        });
        continue;
    }
    fs.writeFileSync('./test.bin', code.substring(2), function(err){
        if(err) {
            return console.log(err);
        }
    });
    
    try{
        var _output = shell.exec('sudo docker run -v /home/learnitdeep/smartcontract-security-checker/server:/server --name test luongnguyen/oyente /bin/bash -c "cd oyente; python oyente.py -s /server/test.bin -b"', {async:false});
        var output = _output.stderr;

        if (shell.exec('sudo docker rm test').code !== 0) {
            shell.echo('Error: Git commit failed');
            shell.exit(1);
        }
    }
    catch(err){
        var _output = "error1";
        var output = _output;
    }

    try{
        _output = shell.exec('sudo docker run --name test mythril /bin/bash -c "myth -x -a '+String(contract_address)+' --rpc infura-rinkeby --max-depth 6"', {async:false});
        output = output + _output.stdout;
        console.log(output);

        if (shell.exec('sudo docker rm test').code !== 0) {
            shell.echo('Error: Git commit failed');
            shell.exit(1);
        }
    }
    catch(err){
        output = output + "error2";
    }
    fs.writeFileSync('./output'+String(getTokenDoneCount)+'.txt', output, function(err){
        if(err) {
            return console.log(err);
        }
    });
    if(output.indexOf('Callstack Depth Attack Vulnerability:  True') >= 0) {
        result = result + 1;
        result_string = result_string + "Be careful! It has callstack depth attack vulnerability.\n";
    }
    if(output.indexOf('Timestamp Dependency:                  True') >= 0) {
        result = result + 10;
        result_string = result_string + "Be carefule! It has timestamp dependency.\n"
    }
    if(output.indexOf('Re-Entrancy Vulnerability:             True') >= 0) {
        result = result + 100;
        result_string = result_string + "Be carefule! It has re-entrancy vulnerability. Do not use it!\n";
    }
    if(output.indexOf('==== Message call to external contract ====') >= 0) {
        result = result + 1000;
        result_string = result_string + "Be carefule! It can call external contract.\n";
    }
    if(output.indexOf('==== Ether send ====') >= 0) {
        result = result + 10000;
        result_string = result_string + "Be carefule! It can send ether to unknown.\n";
    }
    if(output.indexOf('==== Transaction order dependence ====') >= 0) {
        result = result + 100000;
        result_string = result_string + "Be carefule! It has transaction order dependence.\n";
    }
    if(output.indexOf('==== State change after external call ====') >= 0) {
        result = result + 1000000;
        result_string = result_string + "Be carefule! It can change state after external call";
    }
    if(output.indexOf('==== Dependence on predictable environment variable ====') >= 0) {
        result = result + 10000000;
        result_string = result_string + "Be carefule! It has dependency on predictable environment variable.\n";
    }
    var mailOptions = {  
        from: 'Myeongsoo Kim <learnitdeep@gmail.com>',
        to: email_to,
        subject: String(contract_address)+" analysis result",
        text: result_string
    };
//    var _output = shell.exec('sudo docker run -v /home/learnitdeep/node_server:/node_server --name test manticore /bin/bash -c "manticore /node_server/test.bin"', {async:false});
//    output = output + _output.stderr;

  //  if (shell.exec('sudo docker rm test').code !== 0) {
  //      shell.echo('Error: Git commit failed');
  //      shell.exit(1);
  //  }

//    if (shell.exec('sudo docker run -v /home/learnitdeep/node_server:/node_server --name test luongnguyen/oyente /bin/bash -c "cd oyente; python oyente.py -s /node_server/test.bin -b"').code !== 0) {
//        shell.echo('Error: Git commit failed');
//        shell.exit(1);
//    }
//    if (shell.exec('sudo docker rm test').code !== 0) {
//        shell.echo('Error: Git commit failed');
//        shell.exit(1);
//    }
}

