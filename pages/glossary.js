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
                    <div  class="flex items-center  w-auto py-4 transition-all duration-300 ease-in-out bg-white bg-transparent mt-0 md:p-0 md:top-0 md:relative md:opacity-100 ">
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
                        <div class="flex flex-wrap py-8 md:flex-nowrap">
                            <div class="flex flex-col flex-shrink-0 px-4 mb-6 md:w-64 md:mb-0">
                                <strong class="flex text-3xl font-thin leading-none text-left text-thin lg:text-4xl">Form</strong>
                            </div>
                            <div class="prose md:flex-grow prose-md">
                                <p>Any form of a specific species of an evolution. Gender variations do not count. Shiny versions of pokemon do count as an alternate form. For example Mew, had two possible forms, Mew and a Shiny Mew. Shlowbro has 4 possible forms. Slowbrow, Shiny Slowbro, Galarian Slowbro, Shiny Galarian Slowbro.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-wrap py-8 md:flex-nowrap">
                            <div class="flex flex-col flex-shrink-0 px-4 mb-6 md:w-64 md:mb-0">
                                <strong class="flex text-3xl font-thin leading-none text-left text-thin lg:text-4xl">Hatch</strong>
                            </div>
                            <div class="prose md:flex-grow prose-md">
                                <p>Hatch means to hatch an egg. How you obtained the egg does not matter.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            </>
            );
}

export default Page;