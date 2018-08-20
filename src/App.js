import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {workspace:{}, screens:[{data:'Zero thing',}, {data:'First Thing'}, {data:'Second Thing'}, {data:'Third Thing'},{data:'Fourth Thing'}],sceenPosition:1,seenHeight:300,seenWidth:600};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.clickedDivision = this.clickedDivision.bind(this);
  }
  

    updateDimensions() {
      const totalHeight = window.innerHeight;
      const totalWidth = window.innerWidth;
      const middleWidth = document.getElementById("middleOne").offsetWidth;
      const middleHeight = document.getElementById("middleOne").offsetHeight;
      this.setState({workspace:{left:(totalWidth-this.state.seenWidth)/2, top:(totalHeight-this.state.seenHeight)/2}});
    }

    componentWillMount() {
      this.setState({workspace:{left:(window.innerWidth-this.state.seenWidth)/2, top:( window.innerHeight-this.state.seenHeight)/2}})
    }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  clickedDivision(event, iValue){
      console.log("Waiting for next response");
      //Two Conditions ...
      if(iValue < this.state.sceenPosition){
        //Clicked Left One..
        event.target.classList.add("move");
        event.target.style.height = this.state.seenHeight+"px";
        event.target.style.width = this.state.seenWidth+"px";
        event.target.style.left = this.state.workspace.left+"px";
        event.target.style.top = this.state.workspace.top+"px";

        document.getElementById("middleOne").classList.add("move");
        document.getElementById("middleOne").style.height = (this.state.seenHeight)/2+"px";
        document.getElementById("middleOne").style.width = this.state.seenWidth+"px";
        document.getElementById("middleOne").style.left = this.state.workspace.left*3+"px";
        document.getElementById("middleOne").style.top = this.state.workspace.top*1.25+"px";

      }else{
         //Clicked Right One... 
          
        event.target.classList.add("move");
        document.getElementById("middleOne").classList.add("move");
        event.target.style.height = this.state.seenHeight+"px";
        event.target.style.width = this.state.seenWidth+"px";
        event.target.style.left = this.state.workspace.left+"px";
        event.target.style.top = this.state.workspace.top+"px";

        document.getElementById("middleOne").style.height = (this.state.seenHeight)/2+"px";
        document.getElementById("middleOne").style.width = this.state.seenWidth+"px";
        document.getElementById("middleOne").style.left = -this.state.workspace.left+"px";
        document.getElementById("middleOne").style.top = this.state.workspace.top*1.25+"px";
        
      }
      setTimeout(function(){
          this.setState({sceenPosition:iValue});
          
          Array.prototype.map.call(document.getElementsByClassName("middle"), (one)=>{
              one.classList.remove("move");
          });
      }.bind(this), 700); 
        
  }



  render() {
    console.log(this.state.workspace);
      const toDisplay = this.state.screens.map((value, i)=>
          

          i === this.state.sceenPosition ? 
                <div id="middleOne" key={i} className="middle" style={{left:this.state.workspace.left, top:this.state.workspace.top, height:this.state.seenHeight+"px", width:this.state.seenWidth+"px"}}>
                  {value.data}
                </div>          
          :     (i < this.state.sceenPosition)  ?  
                
                <div key={i} className="middle" style={{left:-this.state.workspace.left, top:this.state.workspace.top*1.25, height:(this.state.seenHeight)/2+"px", width:this.state.seenWidth+"px"}} onClick={(e) => this.clickedDivision(e, i)}>
                  {value.data}
                </div>          

          :
                <div key={i} className="middle" style={{left:this.state.workspace.left*3, top:this.state.workspace.top*1.25, height:(this.state.seenHeight)/2+"px", width:this.state.seenWidth+"px", zIndex:(this.state.sceenPosition+1-(i))}} onClick={(e) => this.clickedDivision(e, i)}>
                  {value.data}
                </div>



           
      );
console.log(toDisplay);
  return (
    <React.Fragment>
    {toDisplay}
    </React.Fragment>
    );
  }
}


export default App;
