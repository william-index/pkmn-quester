import Link from 'next/link';
import { supabase } from './../lib/supabaseClient';
import { getChallenge } from './../lib/challengeCreator';

import styles from '../styles/Quest-List.module.css';


// @TODO use start_date as an actual column instead of created at
// @TODO create new challenges which will require some type of auth to push
// @TODO rename this to be challenges
// @TODO make it pretty
// --- show as active or ended
// --- some simple table
// @TODO add leaderboard to top or something for fun

// returns a date from a date plus a set number of days
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------PRIVATE VIEW METHODS----------------- //
// -------------------------------------------------- //
// -------------------------------------------------- //

function getStartDate(challengeDate) {
    let parseDate=new Date(challengeDate)
    return (parseDate.getMonth()+1)+ "/" + parseDate.getDate() + "/" + parseDate.getFullYear()
}

function getEndDate(challengeDate) {
    let parseDate=new Date(challengeDate)
        parseDate = parseDate.addDays(7)
    return (parseDate.getMonth()+1)+ "/" + parseDate.getDate() + "/" + parseDate.getFullYear()
}

async function checkChallenges() {
    console.log('check for challenges')
    let { data } = await supabase.from('challenge_history').select().order('id', { ascending: false }).limit(1)

    console.log('can flagz')
    let mostRecChall = data[0]
    if (shouldCreateChallenge(mostRecChall)) {
        //        let parseDate=new Date(data.created_at)
        getChallenge(true)
    }

    console.log(data)
}

function shouldCreateChallenge(mostRecChall) {
    let questionDate=new Date(mostRecChall.created_at)
    var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    var ONE_HOUR = 1 * 60 * 60 * 1000;
    var ONE_MIN = 1 * 60 * 1000;

    console.log('should create',((new Date) - questionDate),ONE_MIN)
    if (((new Date) - questionDate) > ONE_MIN) {
        return true
    }

    return false
}

// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------THE ACTUAL TEMPLATE------------------ //
// -------------------------------------------------- //
// -------------------------------------------------- //

// Props requires for page render
export async function getServerSideProps(context) {
    let { data } = await supabase.from('challenge_history').select().order('id', { ascending: false }).limit(10)

    let returnVal = {
        props: {
            challenge_templates: data
        },
    }

    return returnVal
}

function Page({ challenge_templates }) {
    checkChallenges()

    return (
            <>
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home1</Link>
            </h2>
            <ul>
                {challenge_templates.map((challenge) => (
                        <li key={challenge.id}>{getStartDate(challenge.created_at)} - {challenge.name} - {getEndDate(challenge.created_at)}</li>
                        ))}
            </ul>
            </>
            );
}

export default Page;