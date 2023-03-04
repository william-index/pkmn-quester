import { supabase } from './../lib/supabaseClient';

// returns a date from a date plus a set number of days
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


let pokeballs = ['Pokeball',
                 'Great Ball',
                 'Ultra ball',
                 'Wing Ball',
                 'Feather Ball',
                 'Jet Ball',
                 'Beast Ball',
                 'Dive Ball',
                 'Dusk Ball',
                 'Fast Ball',
                 'Friend Ball',
                 'Gigaton Ball',
                 'Heal Ball',
                 'Heavy Ball',
                 'Level Ball',
                 'Love Ball',
                 'Lure Ball',
                 'Luxury Ball',
                 'Master Ball',
                 'Moon Ball',
                 'Nest Ball',
                 'Net Ball',
                 'Origin Ball',
                 'Premier Ball',
                 'Quick Ball',
                 'Repeat Ball',
                 'Safari Ball',
                 'Sport Ball',
                 'Timer Ball'
                 ]

async function constructChallenge(recentDate) {
    console.log('starting challenge creator')

    let quest = await getCommonQuest()

    let parseDate=new Date(recentDate)
    parseDate = parseDate.addDays(7)
    let newDate = (parseDate.getMonth()+1)+ "/" + parseDate.getDate() + "/" + parseDate.getFullYear()

    console.log('challenge:',quest.name, quest.type, newDate)

    // saves new quests to DB
    const { error } = await supabase.from('challenge_history').insert({ name: quest.name, quest_type: quest.type, simple_date: newDate })

    return "my new challenge"
}

// picks a common quest
async function getCommonQuest() {
    const questKeys = [
        'catchShiny',
        'catchSubLegend',
        'catchShinyBall',
        'randomTeam',
        'getShinySubLegend',
        'typeRaidChallenge',
        'regionalElite4',
        'shinyGymLeader',
    ]
    const randomIndex = Math.floor(Math.random() * questKeys.length);
    const chosenKey = questKeys[randomIndex];

    let questString=''
    let questType=''


    // Quest to catch a regular shiny pokemon
    if (chosenKey=="catchShiny") {
        let selectedMon = await getBasicPokemon()
        questString = 'CATCH a shiny '+ selectedMon.Original_Name + '.'
        questType = 'catch'
    }

    // Wild Team
    if (chosenKey=="randomTeam") {
        let selectedMon1 = await getBasicPokemon()
        let selectedMon2 = await getBasicPokemon()
        let selectedMon3 = await getBasicPokemon()
        let selectedMon4 = await getBasicPokemon()
        questString = 'DEFEAT your rival with pokemon from each of the following families on your team: '+ selectedMon1.Original_Name + ', '+ selectedMon2.Original_Name + ', '+ selectedMon3.Original_Name + ', '+ selectedMon4.Original_Name
        questType = 'battle'
    }

    // Quest to catch any shiny pokemon in a specific ball
    if (chosenKey=="catchShinyBall") {
        questString = 'CATCH a shiny pokemon in a '+ getBall() +'.'
        questType = 'catch'
    }

    // Quest to catch any subLegend
    if (chosenKey=="catchSubLegend") {
        let selectedMon = await getSubLegendPokemon()
        questString = 'CATCH a '+  selectedMon.Original_Name +'.'
        questType = 'catch'
    }

    // Regional Elite Four Challange
    if (chosenKey=="regionalElite4") {
        let selectedMon = await getBasicPokemon()
        questString = 'DEFEAT the Elite Four using only pokemon from gen '+ selectedMon.Generation + '.'
        questType = 'battle'
    }

    // Train and battle with a type
    if (chosenKey=="typeRaidChallenge") {
        let selectedMon = await getBasicPokemon()
        questString = 'CATCH and TRAIN a '+ selectedMon.Type1 +' pokemon and DEFEAT a 5* raid pokemon its weak against.'
        questType = 'multi'
    }

    // all shiny leader
    if (chosenKey=="shinyGymLeader") {
        let selectedMon = await getBasicPokemon()
        questString = 'DEFEAT a friend using a team of 6 shiny '+ selectedMon.Type1 + ' pokemon.'
        questType = 'battle'
    }


    // Quest to catch any shiny subLegend
    if (chosenKey=="getShinySubLegend") {
        let selectedMon = await getSubLegendPokemon()
        questString = 'GET a shiny '+  selectedMon.Original_Name +'.'
        questType = 'catch'
    }

    // format for proper return object
    let quest = {
        name: questString,
        type: questType
    }
    return quest
}

function getBall() {
    // get random index value
    const randomIndex = Math.floor(Math.random() * pokeballs.length);

    // get random item
    const ball = pokeballs[randomIndex];

    return ball;
}

// gets a pokemon that is not a mega, has a Category of Ordinary and has Base_Experience of less than 100
async function getBasicPokemon() {
    let { data } = await supabase.from('pokedex').select().neq('Mega_Evolution_Flag', 'Mega').eq('Category', 'Ordinary').lt('Base_Experience', 100)

    // get random index value
    const randomIndex = Math.floor(Math.random() * data.length);

    // get random item
    const pkmn = data[randomIndex];

    return pkmn;
}

// gets any sublegend
async function getSubLegendPokemon() {
    let { data } = await supabase.from('pokedex').select().neq('Mega_Evolution_Flag', 'Mega').eq('Category', 'Semi-Legendary')

    // get random index value
    const randomIndex = Math.floor(Math.random() * data.length);

    // get random item
    const pkmn = data[randomIndex];

    return pkmn;
}

async function getLegendaryPokemon() {
    let { data } = await supabase.from('pokedex').select().neq('Mega_Evolution_Flag', 'Mega').eq('Category', 'Legendary')

    // get random index value
    const randomIndex = Math.floor(Math.random() * data.length);

    // get random item
    const pkmn = data[randomIndex];

    return pkmn;
}


export const getChallenge = constructChallenge