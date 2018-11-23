pragma solidity ^0.4.2;

contract FreelanceSecurity {
    address owner = msg.sender;
    function  FreelanceSecurity () internal
    {
        if(owner != msg.sender)
        {
            selfdestruct(owner);
        }
        else {
            Freelance;
        }
    }
}


contract Freelance {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint price;
        address pubAddr;
        
        
    }
    address masterAddress ;
    uint price;
    // Read/write candidates
    uint winner;
    //Have to store somewhere the projects with the structure elements it has to be string and 
    mapping (uint => Candidate) public candidates;
    uint maxCandidates = 10;
    
    struct Projects {
        string requirements;
        uint256 lenghtOfContract;
    }
    
    mapping (address => Projects) public project;
    mapping (address =>bool) public freelancers;
   
    // Store Candidates Count
    uint public candidatesCount ;
    uint public projectsCount = 0;
    uint public oneAddCnt ;
    address owner = msg.sender;
    uint public counter;
    constructor  () public payable {
        addFreelancer("Candidate 1",2);
        addFreelancer("Candidate 2",2);
   
    }
    function oneAdd (string namef,uint256 price) public {
        counter++;
        if(oneAddCnt >= 1)
        {
            if(freelancers[msg.sender]) return ;
        }
        else {
            oneAddCnt ++;
            require(candidatesCount <maxCandidates);
            addFreelancer(namef,price);
        }
        
    }
   
 
    function addFreelancer (string _name,uint price) private {
       
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, price,msg.sender);
    }
    
    function f (uint start,uint daysAfter) private {
        if(now >= start+daysAfter * 2 hours){
            selfdestruct(msg.sender);
    }        
    }
    function Pay (uint256 _freelancerId) public payable  {
        require(_freelancerId > 0) ;
        require(_freelancerId <= candidatesCount);
        //require(msg.sender == owner);
        address hardCodedAddress = candidates[_freelancerId].pubAddr;
        hardCodedAddress.call(candidates[_freelancerId].price);
     //   owner.call(candidates[_freelancerId]);
     
    
    }
    function CreateAProject(string _requirements,uint _lenghtOfContract) public {
        projectsCount++;
       
        require(freelancers[msg.sender]);
        project[msg.sender] = Projects(_requirements,_lenghtOfContract);
        
    }
   
}