import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'

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
        getChallenge(mostRecChall.simple_date)
    }

    console.log(data)
}

function renderChallangeTypeDesc(qtype, typeObj) {
    let obj = typeObj.find(o => o.type === qtype);
    if (obj==undefined) {
        return 'fail'
    }

    return obj.description
}

function shouldCreateChallenge(mostRecChall) {
    let questionDate=new Date(mostRecChall.simple_date)
    var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    var ONE_HOUR = 1 * 60 * 60 * 1000;
    var ONE_MIN = 1 * 60 * 1000;

    console.log('should create',((new Date) - questionDate),ONE_MIN)
    if (((new Date) - questionDate) > SEVEN_DAYS) {
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
    let { data : qHistory } = await supabase.from('challenge_history').select().order('id', { ascending: false }).limit(10)
    let { data : qTypes } = await supabase.from('challenge_types').select()

    let returnVal = {
        props: {
            challenge_history: qHistory,
            challenge_types: qTypes,
        },
    }

    return returnVal
}

function Page({ challenge_history, challenge_types}) {
    checkChallenges()

    return (
            <>
            <nav class="relative bg-blue-600 shadow">
                <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center ">
                    <div class="flex items-center justify-between">
                        <Link href="/"><img src="https://github.com/william-index/pkmn-quester/raw/main/public/static/images/logo.png" alt="" width='200' height='20' /></Link>
                    </div>
                    <div  class="flex items-center  w-auto py-4 transition-all duration-300 ease-in-out bg-transparent mt-0 md:p-0 md:top-0 md:relative md:opacity-100 ">
                        <div class="flex flex-row">
                            <Link href="/" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 mx-2 md:mx-4 md:my-0">Quests</Link>
                            <Link href="/glossary" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 mx-4 md:my-0">Glossary</Link>
                            <Link href="/about" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 mx-4 md:my-0">About</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* The Currently Running Quest */}
            <section>
                <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
                    <div class="flex w-full mx-auto text-left">
                        <div class="relative inline-flex items-center mx-auto align-middle">
                            <div class="text-center">
                                <div class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">Current Quest</div>
                                <div class="history-title max-w-5xl text-2xl font-bold text-yellow-500 leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl" dangerouslySetInnerHTML={{ __html: challenge_history[0].name }}>
                                </div>
                                <p class="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">{renderChallangeTypeDesc(challenge_history[0].quest_type, challenge_types)}</p>
                                <div class="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6 text-white">
                                    {getStartDate(challenge_history[0].simple_date)} — {getEndDate(challenge_history[0].simple_date)}
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </section>

            {/* TReecent Quests */}
            <div class="relative bg-white px-6 pt-5  pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <span class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">Previous Quests</span>
                <div class="space-y-6 py-8 text-base leading-7 text-gray-600 divide-y divide-gray-300">

                    {challenge_history.slice(1).map((challenge) => (

                            <div key={challenge.id}>
                                <span class="text-sm text-gray-500">{getStartDate(challenge.simple_date)} — {getEndDate(challenge.simple_date)}</span>
                                <div class="mt-3 text-lg font-medium leading-6">
                                    <div class="history-title text-xl text-gray-800 lg:text-2xl" dangerouslySetInnerHTML={{ __html: challenge.name }}></div>
                                </div>
                                <p class="mt-2 text-lg text-gray-500">{renderChallangeTypeDesc(challenge.quest_type, challenge_types)}</p>
                            </div>
                    ))}


                </div>
            </div>
            </>
            );
}

export default Page;