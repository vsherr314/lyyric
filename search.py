from flask import Flask, render_template, request
from flask import redirect, url_for
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    try:
        if request.method == 'POST':
            song = request.form.get('lyrics-input', '')
            word_list = get_lyrics(song)
            return render_template('song.html', word_list=word_list)

        return render_template('index.html')
    except Exception as e:
        print(f"An error occurred: {e}")
        return render_template('error.html', error_message=str(e))

def get_lyrics(song):
    try:
        search = f'{song} lyrics'
        url = f'https://www.google.com/search?q={search}'

        options = Options()
        options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)
        driver.get(url)
        time.sleep(1)
        lyrics_div = driver.find_element(By.CLASS_NAME, "xaAUmb")
        lyrics = lyrics_div.text
        driver.quit()

        formatted_lyrics = lyrics.lower().replace(',', '').replace("'", '').replace('"', '').replace('.', '').replace('?', '').replace(' ', '\n')
        word_list = formatted_lyrics.split('\n')

        return word_list
    except Exception as e:
        print(f"An error occurred in get_lyrics: {e}")
        raise

if __name__ == '__main__':
    app.run(debug=True)