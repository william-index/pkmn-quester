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
            <section>
                <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
                    <div class="flex w-full mx-auto text-left">
                        <div class="relative inline-flex items-center mx-auto align-middle">
                            <div class="text-center">
                                <h1 class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                                    Long headline to turn
                                    your visitors into users
                                </h1>
                                <p class="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                                <div class="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                                    <div class="mt-3 rounded-lg sm:mt-0">
                                        <button class="px-5 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Get bundle</button>
                                    </div>
                                    <div class="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                                        <button class="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">See features</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    <section id="intro">
                        <div class="flex flex-col items-center justify-center pt-24 mx-auto rounded-lg lg:px-10 max-w-7xl">
                            <section>
                                <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                                    <div class="grid grid-cols-1">
                                        <div class="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
                                            <div class="p-6 lg:text-center">
                                                <span class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">Current Quest</span>
                                                <h4 class="mt-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">The file is on it's way</h4>
                                                <p class="mt-3 text-base leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                                                <div class="mt-6">
                                                    <a href="#" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Accept </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    </div>
                    </section>


            <div class="relative bg-white px-6 pt-5  pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <span class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">Previous Quest</span>
                <div class="space-y-6 py-8 text-base leading-7 text-gray-600 divide-y divide-gray-300">

                    {challenge_templates.map((challenge) => (

                            <div key={challenge.id}>
                                <span class="text-sm text-gray-500">August 20.20.21</span>
                                <p class="mt-3 text-lg font-medium leading-6">
                                    <a href="./blog-post.html" class="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">
                                        {getStartDate(challenge.created_at)} - {challenge.name} - {getEndDate(challenge.created_at)}
                                    </a>
                                </p>
                                <p class="mt-2 text-lg text-gray-500">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</p>
                            </div>
                    ))}


                </div>
            </div>
            </>
            );
}

export default Page;