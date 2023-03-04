import { supabase } from './../lib/supabaseClient';

async function constructChallenge(run) {
    console.log('starting challenge creator')
    getBasicPokemon()

    let { data } = await supabase.from('challenge_templates').select()
    //    const { error } = await supabase.from('challenge_history').insert({ name: 'Denmark' })

    return "my new challenge"
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


export const getChallenge = constructChallenge