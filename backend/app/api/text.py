import nltk
import random
import asyncio
from nltk.corpus import words
from fastapi import APIRouter

router = APIRouter()

nltk.download('words')
word_list = words.words()

filtered_words = [w for w in word_list if 3 <= len(w) <= 7]

async def generate_words(n):
    return await asyncio.to_thread(random.sample, filtered_words, n)

@router.get("/text")
async def generation_words():
    sample = await generate_words(30)
    return {"words": sample}
