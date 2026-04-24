export const translations = {
  en: {
    HERO_TITLE_PREFIX: "Automated",
    HERO_TITLE_HIGHLIGHT: "Research",
    HERO_TITLE_SUFFIX: "Labs",
    HERO_SUBTITLE: "Exploring the frontiers of machine intelligence, one pipeline run at a time.",
    FETCHING_RESEARCH: "Fetching latest research...",
    FAILED_LOAD: "Failed to load research posts.",
    NO_RESEARCH: "No research published yet. Run the pipeline!",
    TAG_RESEARCH: "AI Research",
    READ_POST: "Read Post",
    VIEW_ARXIV: "View on arXiv/Zenodo",
    VIEW_CODE: "View Code",
  },
  de: {
    HERO_TITLE_PREFIX: "Automatisierte",
    HERO_TITLE_HIGHLIGHT: "Forschungs",
    HERO_TITLE_SUFFIX: "Labore",
    HERO_SUBTITLE: "Erforschung der Grenzen der maschinellen Intelligenz, ein Pipeline-Lauf nach dem anderen.",
    FETCHING_RESEARCH: "Neueste Forschungsergebnisse werden abgerufen...",
    FAILED_LOAD: "Forschungsbeiträge konnten nicht geladen werden.",
    NO_RESEARCH: "Noch keine Forschung veröffentlicht. Starte die Pipeline!",
    TAG_RESEARCH: "KI-Forschung",
    READ_POST: "Beitrag lesen",
    VIEW_ARXIV: "Auf arXiv/Zenodo ansehen",
    VIEW_CODE: "Code ansehen",
  },
  tr: {
    HERO_TITLE_PREFIX: "Otomatik",
    HERO_TITLE_HIGHLIGHT: "Araştırma",
    HERO_TITLE_SUFFIX: "Laboratuvarları",
    HERO_SUBTITLE: "Makine zekasının sınırlarını keşfetmek, her seferinde bir boru hattı çalışması.",
    FETCHING_RESEARCH: "En son araştırmalar getiriliyor...",
    FAILED_LOAD: "Araştırma gönderileri yüklenemedi.",
    NO_RESEARCH: "Henüz yayınlanmış araştırma yok. Boru hattını çalıştırın!",
    TAG_RESEARCH: "Yapay Zeka Araştırması",
    READ_POST: "Gönderiyi Oku",
    VIEW_ARXIV: "arXiv/Zenodo'da görüntüle",
    VIEW_CODE: "Kodu Görüntüle",
  }
};

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof typeof translations["en"];
