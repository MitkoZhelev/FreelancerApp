var publicCounter;
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Freelance.json", function(freelance) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Freelance = TruffleContract(freelance);
      // Connect provider to interact with contract
      App.contracts.Freelance.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Freelance.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      
      
     if(document.getElementById("myName") != true) {

     }else{
      var test = document.getElementById("myName").value;
      console.log(test);
    
     }
      
      
     pulicCounter = candidatesCount[0];
     console.log(candidatesCount);
      for (var i = 1; i <= candidatesCount; i++) {
        
        electionInstance.candidates(i).then(function(candidate) {
          
          
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];
          var address = candidate[3];
          
         
          //var radioButton = " <input type='checkbox' name='selectFreelancer' id = 'winner' value=" + id +" + >";
          
            // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td> + <td>" +address  +   "</td></tr> ";
          
         
          candidatesResults.append(candidateTemplate);
          
        } 
        
      );

      }
   


      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  myFunction:function () {
   // document.getElementById("myName").value;
    var name = document.getElementById("myName").value ;
    var currency = document.getElementById("Currency").value;
    //var currencyIndex = document.getElementById("currencyIndex").value;
    if(currency <= 0 ){
      alert("Invalid Value!");
      console.log("Invalid Value!");
    }
    else {
    console.log(name);
   
   App.inputAddElement(name,currency);
    }
    
},
inputAddElement: function(candidateId,_currency) {
// candidateId = App.myFunction();
  console.log(_currency);
  App.contracts.Freelance.deployed().then(function(instance) {
      return instance.oneAdd(candidateId,_currency);
  })
},
selectWinner: function() {
  
var winner = document.getElementById("winnerId").value;


 console.log(winner);
  
if(winner > 0 && winner <= 10 )
{
  App.contracts.Freelance.deployed().then(function(instance) {
    return instance.Pay(winner);
  });

} else {

  alert("You have chosen unexisting ID!!");
}


}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});