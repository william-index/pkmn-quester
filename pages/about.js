import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'

import { supabase } from './../lib/supabaseClient';
import { getChallenge } from './../lib/challengeCreator';


// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------THE ACTUAL TEMPLATE------------------ //
// -------------------------------------------------- //
// -------------------------------------------------- //


function Page({ }) {

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

            <section class="relative bg-white px-6 pt-5 sm:mt-10 md:mt-20  pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-5xl sm:rounded-lg sm:px-10">
                <div class=" flex flex-col items-left px-5 py-8 mx-auto lg:px-24">
                    <div>
                        <h1 class="max-w-5xl text-2xl font-bold text-blue-500 leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl">
                            About Pkmn Quester
                        </h1>

                        <div class="prose md:flex-grow prose-md py-8">
                            <p>Pokémon is awesome, but once you finish the games and get a living dex its tough what to do next. The Pokemon Company (TPC) releases online events, but for many advanced players those events end up only lasting 20 minutes. Pkmn Quester is designed to give players some extra fun. Every week a new quest is randomly generated for you to focus on completing. Compete with friends, and do whatever is most enjoyable. Happy catching.</p>
                        </div>

                        <h2 class="max-w-5xl text-1xl font-bold text-yellow-500 leading-none tracking-tighter md:text-3xl lg:text-4xl lg:max-w-5xl">
                            Do I have to use a specific game?
                        </h2>

                        <div class="prose md:flex-grow prose-md py-8">
                            <p>Unless a quest specifies a game, you can do the quest in any one title or across multiple. They don't need to be main franchise titles either. Use Pokemon Go, Pokemon Snap or whatever else you want. This is for you to have fun.</p>
                        </div>

                        <h2 class="max-w-5xl text-1xl font-bold text-yellow-500 leading-none tracking-tighter md:text-3xl lg:text-4xl lg:max-w-5xl">
                            By @WilliamAndTech
                        </h2>

                        <div class="prose md:flex-grow prose-md py-8">
                            <p>Pkmn Quester was build by William Anderson (Twitter: @WilliamAndTech), just for fun. Its not monetized in any way and is purely a project for people to use to get a bit more play out of all their pokemon games.</p>
                        </div>
                    </div>

                </div>

            </section>
            </>
            );
}

export default Page;