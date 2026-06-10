import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);

  async lookupWord(word: string) {
    try {
      // 1. Lấy thông tin tiếng Anh từ Free Dictionary API
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      
      if (!dictRes.ok) {
        throw new Error(`Không tìm thấy từ: ${word}`);
      }

      const dictData = await dictRes.json();
      const entry = dictData[0];
      
      // Lấy phiên âm và audio
      let pronunciation = '';
      let audioUrl = '';
      
      if (entry.phonetics && entry.phonetics.length > 0) {
        const phonetic = entry.phonetics.find((p: any) => p.text && p.audio);
        if (phonetic) {
          pronunciation = phonetic.text;
          audioUrl = phonetic.audio;
        } else {
          pronunciation = entry.phonetics[0]?.text || '';
          audioUrl = entry.phonetics.find((p: any) => p.audio)?.audio || '';
        }
      }

      // Lấy định nghĩa và ví dụ tiếng Anh
      const meaning = entry.meanings[0];
      const definition = meaning.definitions[0].definition;
      const example = meaning.definitions[0].example || '';

      // 2. Dịch sang tiếng Việt dùng Google Translate public endpoint
      // Dịch từ vựng
      const wordVi = await this.translate(word);
      
      // Dịch ví dụ (nếu có)
      let exampleVi = '';
      if (example) {
        exampleVi = await this.translate(example);
      }

      return {
        english: word.toLowerCase(),
        vietnamese: wordVi.toLowerCase(),
        pronunciation,
        audioUrl,
        example,
        exampleVietnamese: exampleVi
      };

    } catch (error) {
      this.logger.error(`Lỗi lookup từ '${word}':`, error);
      throw error;
    }
  }

  private async translate(text: string): Promise<string> {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      
      // Google trả về format: [[[ "bản dịch", "bản gốc", ... ]]]
      let translatedText = '';
      if (data && data[0] && Array.isArray(data[0])) {
        for (const part of data[0]) {
          if (part[0]) {
            translatedText += part[0];
          }
        }
      }
      return translatedText;
    } catch (err) {
      this.logger.error(`Lỗi dịch đoạn văn: ${text}`, err);
      return '';
    }
  }
}
