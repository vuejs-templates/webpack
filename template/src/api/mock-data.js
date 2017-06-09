const info = {
  listening: [
    '在语速很慢的情况下，偶尔能听懂有限的、简单的个别词汇，但是无法理解大部分句子和话题内容。需要一段时间才能反应出已经认识的词汇、短语和句子。',
    '在语速较慢的情况下，可以听出简单的已有词汇，无法迅速反应出已经认识的词汇和短语。对于语速适中，发音特点不熟悉，有生僻词出现，语法结构没有掌握的情况下，会存在理解上的障碍。',
    '在语速适中的情况下，可以听出关键的词汇，短语，但需要一定时间反应，可以理解和推测出句子和话题的大致内容。当语速较快，发音特点不熟悉，生僻词较多，语法结构复杂，话题不熟悉的情况下，会存在理解上的障碍。',
    '在语速适中或偶尔较快的情况下，可以听出大部分词汇，短语和句子，并能迅速理解和推测出话题的大致内容。 当语速较快，生僻词较多，语法结构复杂，话题不熟悉的情况下可以通过情景猜测和推断出基本含义，但有时会存在理解上的偏差。',
    '在语速较快的情况下，也能够迅速理解绝大部分话题内容。当语速很快，生僻词较多，句型复杂，话题不熟悉的情况下能够通过情景推测出生词含义，句子意思和话题内容，能将这些内容记忆下来作为自己的知识储备。'
  ],
  pronunciation: [
    '不太熟悉英语的发音方式，单词和短语的发音存在较多错误，听者理解起来比较困难。',
    '对话时在句子中，有较多单词出现误读和发音错误，会因此造成听者理解困难；尚未很好地掌握英语的升降语调、重读弱读、连读等发音技巧。',
    '能够掌握一些英语的升降语调、重读弱读、连读等发音技巧，但使用不够全面和熟练。表达时会出现一些影响听者理解的情况。',
    '较全面掌握并能灵活使用英语的升降语调、重读弱读、连读等发音技巧且使用基本正确。表达时会出现偏差但对听者理解的影响较小不影响对话交流。',
    '能够准确运用升降语调、重读弱读、连读等多样的发音技巧，仅存在偶尔偏差、能准确熟练地进行对话交流。'
  ],
  vocabulary: [
    '仅能使用很简短的单词和短语，能使用极其简单且有限的词汇。',
    '能使用简短的单词、短语、固定搭配进行表达，词汇量较为有限。',
    '在表达时能够较正确地选择和使用词汇，并能使用一定量的短语和固定搭配，但尚不能熟练灵活地选择使用不同场景下地词汇搭配。',
    '能够根据话题、场景选择不同的词汇搭配准确地表达意思，对不同对话场景下的表达方式地选择有一定掌握，但有时词汇使用会出现错误不够精准地道。',
    '词汇使用丰富，熟练并相对自然地使用高阶词汇和习语；偶尔会出现词汇选择和使用表意不够准确的情况。'
  ],
  grammar: [
    '不太能够说出完整的句子，基本语法（如单复数、时态等）错误较多。',
    '能使用一些短语和简单句进行交流，时常会出现基本语法（如单复数、时态、基本句型）的错误，不太能使用复合句和复杂句。',
    '能较为熟练地使用各类语法、句型进行交流，能较为清晰地表达意思，但会出现某些特定的语法错误或复杂的句型使用上的错误。',
    '能够较为灵活地使用一系列复杂语法结构，简单句和复杂句混合交替使用。但仍会习惯性地出现一些语法错误、但是语句通常正确，且能做到表达时的自我纠正。',
    '能够熟练并精确使用多种语法和句型结构，有时也会出现极少量的语法错误、但不是经常性地重复出现。'
  ]
}

module.exports = {
      level: 2,
      recommended: 2,
      create_time: '2017-12-1',
      update_time: '2017-1-21',
      teacher: {
        name: 'Barbara',
        avatarUrl: 'static/teacher_avatar.jpg',
        graduate: 'Bachelor of Science',
        education: {
          institution: 'Brigham Young University',
          years: '2001 - 2005'
        }
      },
      student: {
        name: {
          en: 'Jack',
          zh: '张三'
        },
        avatarUrl: 'static/student_avatar.jpg',
        birthday: '2011-5-13'
      },
      assessment: [{
          caption: {
            en: 'Listening',
            zh: '听力'
          },
          score: 5,
          text: 'Cathy has great listening skills and follows instructions well.\nCathy has great listening skills and follows instructions well.\n\nCathy has great listening skills and follows instructions well.',
          info: info.listening
        },{
          caption: {
            en: 'Pronunciation',
            zh: '发音'
          },
          score: 3,
          text: 'Her pronunciation needs a little bit of work - sci-ssors - break down the word in to the sounds It helps to sing things',
          info: info.pronunciation
        },{
          caption: {
            en: 'Vocabulary',
            zh: '词汇'
          },
          score: 4,
          text: 'Cathy\'s vocabulary was good she knew colours, animals, time and had good general conversation. She needs to practice the new vocabulary from today\'s lesson.',
          info: info.vocabulary
        },{
          caption: {
            en: 'Grammar',
            zh: '语法'
          },
          score: 1,
          text: 'Her overall grammer is good, she can help herself practice more by always making full sentences eg. instead of just saying \'blue\' say instead \' the table is big and blue\'.',
          info: info.grammar
        }],
      feedback: [{
          caption: {
            en: 'Participation',
            zh: '参与'
          },
          score: 1,
          text: 'Great energy in the class! Infectious smile!'
        },{
          caption: {
            en: 'Behavior',
            zh: '表现'
          },
          score: 5,
          text: 'Well behaved, followed instructions and had fun without being naughty!'
        }]
    }
