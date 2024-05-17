import React from 'react';
import axios from 'axios';
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Button } from "@mui/material"

const letterContainer = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        y: 100,
    },
};

const Data = async () => {
   await fetch("http://localhost:3000/")
        .then((res) => res.json())
        .then(data => console.log(data))

}

const FetchData = async () => {
    const { data } = await fetch('http://localhost:3000/')
        return await data.json()
}

const Home = () => {
    const text1 = "Hello";
    const text2 = "Welcome to Todolist App";
    const text3 = "What Would You like to do?";
    
    const { isPending, error, data } = useQuery({
        queryKey: ["Home"],
        queryFn: async () =>{
            const { data }= await axios.get('http://localhost:3000/')
            return data
        }
    })
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
    

    return (
        <div className='flex items-center'>
            <div className={'flex items-center'}>
                <div className='dark:bg-[#2C2C2C] bg-neutral-50 flex lg:justify-center items-center  h-screen pl-4 fixed left-0 top-0 w-full md:w-[65%] md:p-0 transition-colors duration-300'>
                    <motion.div
                        className="pl-4 md:pl-8  mt-24 md:mt-0"
                        variants={letterContainer}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        <motion.h1
                            className="font-playfair dark:text-neutral-50 text-zinc-700  max-w-[22.125rem] text-2xl leading-[2rem] md:max-w-xl md:text-5xl md:leading-[3.75rem] overflow-hidden transition-colors duration-300"
                            variants={letterContainer}
                            initial='hidden'
                            animate='show'
                        >
                            {text1.split("").map((letter, index) => (
                                <motion.span key={index} variants={letterContainer}>
                                    {letter}
                                </motion.span>
                            ))}
                            ! <br />
                            {text2.split("").map((letter, index) => (
                                <motion.span key={index} variants={letterContainer}>
                                    {letter}
                                </motion.span>
                            ))}
                            , <br />
                            {text3.split("").map((letter, index) => (
                                <motion.span key={index} variants={letterContainer}>
                                    {letter}
                                </motion.span>
                            ))}

                        </motion.h1>
                        <motion.div
                            className="text-5xl font-bold text-center w-[13rem]"
                            variants={letterContainer}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >

                            <Button endIcon={<ArrowForwardRoundedIcon />}
                                component="a"
                                href="/signup"
                            >
                                Get started
                            </Button>
                            <Button
                                component="a"
                                href='/login'
                            >
                                Already have an account? Login
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
                <div>
                    <h1>{data}</h1>
                    {/* <h2><Data /></h2> */}

                </div>
            </div>
        </div>
    )
}

export default Home