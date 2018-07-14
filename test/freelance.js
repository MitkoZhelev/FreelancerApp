var Freelance = artifacts.require("./Freelance.sol");

contract("Freelance", function(accounts) {
  var electionInstance;

  it("initializes with two freelancers", function() {
    return Freelance.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("it initializes the freelancers with the correct values", function() {
    return Freelance.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "contains the correct id");
      assert.equal(candidate[1], "Candidate 1", "contains the correct name");
      assert(candidate[2]> 0, "contains the correct number");
      return electionInstance.candidates(2);
    }).then(function(candidate) {
      assert.equal(candidate[0], 2, "contains the correct id");
      assert.equal(candidate[1], "Candidate 2", "contains the correct name");
      assert(candidate[2] > 0, "contains the correct number");
    });
    
  });
  it("it throws and exception for invalid freelancer",function (){
  return Freelance.deployed().then(function(instance){
    electionInstance = instance;
    return electionInstance.candidatesCount();
   
  }).then(function(candidatesCount){
    assert(candidatesCount >0 && candidatesCount <10,"The freelancers are real");

  });    
  });
  

});