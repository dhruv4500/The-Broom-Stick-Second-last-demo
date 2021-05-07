class Player{

    constructor(){

        this.name=null;
        this.index=null;
        this.rank=null;
        this.distance=0;
        this.y=100;

    }

    display(){
        
    }

    updatePlayerDetails(){
        var playerIndex="players/player"+this.index;
        database.ref(playerIndex).update({
            'name': this.name,
            'distance':this.distance
        })
    }

    updateBroomDis(){
        var playerIndex="players/player"+1;
        database.ref(playerIndex).update({
            'name': this.name,
            'distance':this.distance
        })
    }

    updateDis(){
        var playerIndex="players/player"+2;
        database.ref(playerIndex).update({
            'name': this.name,
            'distance':this.distance
        })
    }

    static getPlayerInfo(){
        var playersRef=database.ref("players");
        playersRef.on("value",(data)=>{
            allPlayers=data.val();
        })
    }

    getRank(){
        var databaseRef=database.ref("allRank");
        databaseRef.on("value",(data)=>{
            this.rank=data.val();
        })
    }

    static updateRank(rank){
        database.ref("/").update({
            'allRank':rank
        })
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
            y: this.y
        });
    } 

}