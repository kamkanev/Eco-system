class Gene{
    constructor(name = "Unnamed", value = 1.0){
        this.name = name
        this.value = value
        this.changeRate = (Math.random()*(3) - 0.5).toFixed(2)
    }

    mergeWith(gene){
        var newGene = new Gene(this.name, this.value);
        newGene.changeRate = this.changeRate

        if(gene.name == this.name){
                newGene.value = (( (gene.value + gene.value * gene.changeRate) + (this.value + this.value * this.changeRate)) / 2).toFixed(2);
                newGene.changeRate = ((this.changeRate * 100 + gene.changeRate * 100) /200).toFixed(2);
        }

        return newGene;
    }

    mergeSelf(){
        var newGene = new Gene(this.name, this.value + (this.value * this.changeRate));
        newGene.changeRate = this.changeRate

        return newGene;
    }

    copy(){
        var newGene = new Gene(this.name, this.value);
        newGene.changeRate = this.changeRate

        return newGene;
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return "Name : " + this.name + "\nValue : " + this.value + "\nRate : " + this.changeRate + "\n";
    }
}

class Trait{
    constructor(name, mutationRate, dominance = true){
        this.name = name
        this.genes = []
        this.mutationRate = mutationRate
        this.isDominant = dominance
    }

    addGene(gene){
        this.genes.push(gene)
    }

    addGenes(genes){
        for (var i = 0; i < genes.lenght; i++){
            this.genes.push(genes[i])
        }
    }

    copy(){
        var newTrait = new Trait(this.name, this.mutationRate, this.isDominant);
        newTrait.addGenes(this.genes);

        return newTrait;
    }

    inheritSelf(){

        var newTrait = new Trait(this.name, this.mutationRate, this.isDominant);
        for(var i = 0; i < this.genes.length; i++){

            if(Math.random() <= this.mutationRate){
                newTrait.addGene(this.genes[i].mergeSelf());
            }else{
                newTrait.addGene(this.genes[i])
            }

        }

    }

    inherit(trait){
        if (trait.name == this.name){
            var mutationRate = Math.max(this.mutationRate, trait.mutationRate)
            var newTrait = new Trait(this.name, mutationRate, this.isDominant && trait.isDominant);

            for(var i = 0; i < this.genes.length; i++){

                if(this.isDominant == trait.isDominant){
                    if(Math.random() <= mutationRate){
                        newTrait.addGene(this.genes[i].mergeWith(trait.genes[i]));
                    }else{
                        newTrait.addGene(Math.random() <= 0.5 ? this.genes[i] : trait.genes[i])
                    }
                }else{
                    if(Math.random() <= mutationRate){
                        newTrait.addGene(this.isDominant ? this.genes[i].mergeSelf() : trait.genes[i].mergeSelf());
                    }else{
                        newTrait.addGene(this.isDominant ? this.genes[i] : trait.genes[i])
                    }
                }

            }

            return newTrait;

        }

        return this.copy();
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        var str = "--- Trait ---\n" + "Name : " + this.name + "\nMutaion Rate: " + this.mutationRate + "\nDominant : " + this.isDominant + "\n|\n";

        for(var i = 0; i < this.genes.length; i++){
            str += this.genes[i].toString() + "-----\n";
        }

        return str;
    }

}