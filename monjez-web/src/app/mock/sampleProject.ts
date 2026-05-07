import type { OutputType, PaperMeta } from '../types'

/**
 * The single sample paper used by the demo. Whatever the user uploads,
 * the same fixed outputs are returned — these point to real files in /public/sample/.
 */
export const SAMPLE_PAPER: PaperMeta = {
  id: 'sample',
  title: 'Attention Is All You Need',
  authors: 'Vaswani, Shazeer, Parmar, et al.',
  year: 2017,
  pages: 14,
  abstract:
    'تقترح الورقة معمارية Transformer التي تعتمد كلياً على آليات الانتباه (Self-Attention) دون الحاجة إلى الشبكات المتكررة (RNN) أو التلافيفية (CNN). تثبت التجارب على مهام الترجمة الآلية تفوقها في الأداء والسرعة.',
  source: 'sample',
}

export const ALL_OUTPUTS: OutputType[] = ['code', 'video', 'slide', 'poster', 'podcast', 'model']

export interface OutputAsset {
  type: OutputType
  label: string
  description: string
  fileUrl: string
  fileName: string
  mimeType: string
  fileSize: string // human-readable
}

/**
 * The fixed assets each output maps to. These files must exist in /public/sample/.
 * The asset URLs are absolute paths from /public.
 */
export const SAMPLE_ASSETS: Record<OutputType, OutputAsset> = {
  code: {
    type: 'code',
    label: 'كود برمجي',
    description: 'تطبيق Python كامل لمعمارية Transformer (~600 سطر)',
    fileUrl: '/sample/code.zip',
    fileName: 'monjez-transformer-code.zip',
    mimeType: 'application/zip',
    fileSize: '12 KB',
  },
  video: {
    type: 'video',
    label: 'فيديو علمي',
    description: 'فيديو بصري يشرح آلية Self-Attention والمعمارية',
    fileUrl: '/sample/video.mp4',
    fileName: 'monjez-video.mp4',
    mimeType: 'video/mp4',
    fileSize: 'حجم الملف',
  },
  slide: {
    type: 'slide',
    label: 'عرض تقديمي',
    description: 'عرض تقديمي احترافي جاهز للعرض والطباعة',
    fileUrl: '/sample/slides.pdf',
    fileName: 'monjez-slides.pdf',
    mimeType: 'application/pdf',
    fileSize: 'حجم الملف',
  },
  poster: {
    type: 'poster',
    label: 'بوستر علمي',
    description: 'بوستر A1 جاهز للطباعة بدقة 300 DPI',
    fileUrl: '/sample/poster.png',
    fileName: 'monjez-poster.png',
    mimeType: 'image/png',
    fileSize: 'حجم الملف',
  },
  podcast: {
    type: 'podcast',
    label: 'بودكاست',
    description: 'حوار مسموع تفاعلي بين مضيف وضيف خبير',
    fileUrl: '/sample/podcast.mp3',
    fileName: 'monjez-podcast.mp3',
    mimeType: 'audio/mpeg',
    fileSize: 'حجم الملف',
  },
  model: {
    type: 'model',
    label: 'نموذج AI',
    description: 'نموذج جاهز للاستدعاء + بطاقة معلومات',
    fileUrl: '/sample/model-card.md',
    fileName: 'monjez-model-card.md',
    mimeType: 'text/markdown',
    fileSize: 'حجم الملف',
  },
}

/**
 * Podcast transcript — used by the audio player.
 */
export const PODCAST_TRANSCRIPT: { speaker: 'host' | 'guest'; startMs: number; endMs: number; text: string }[] = [
  { speaker: 'host', startMs: 0, endMs: 4500, text: 'مرحباً بكم في حلقة جديدة من "أوراق وأفكار". اليوم نناقش واحدة من أهم الأوراق في تاريخ الذكاء الاصطناعي.' },
  { speaker: 'host', startMs: 4500, endMs: 9000, text: 'معنا الدكتورة سارة لنتحدث عن "Attention Is All You Need". أهلاً بك دكتورة!' },
  { speaker: 'guest', startMs: 9000, endMs: 13000, text: 'شكراً لك. هذه الورقة فعلاً غيّرت قواعد اللعبة في معالجة اللغة الطبيعية.' },
  { speaker: 'host', startMs: 13000, endMs: 18000, text: 'ما هي المشكلة التي حاول الباحثون حلّها؟' },
  { speaker: 'guest', startMs: 18000, endMs: 26000, text: 'النماذج السابقة مثل LSTM كانت تعالج النص كلمة تلو الأخرى بشكل تسلسلي، مما يجعل التدريب بطيئاً جداً ولا يستفيد من قدرات الـ GPU بالتوازي.' },
  { speaker: 'host', startMs: 26000, endMs: 30000, text: 'وما الحل الذي اقترحته الورقة؟' },
  { speaker: 'guest', startMs: 30000, endMs: 38000, text: 'الفكرة الجريئة كانت: لنتخلّص من الشبكات المتكررة كلياً ونعتمد فقط على آلية تسمى "Self-Attention" تنظر لكل الكلمات دفعة واحدة.' },
  { speaker: 'host', startMs: 38000, endMs: 43000, text: 'وما النتائج التي حقّقتها؟' },
  { speaker: 'guest', startMs: 43000, endMs: 52000, text: 'حققت رقماً قياسياً في الترجمة الإنجليزية-الألمانية بـ 28.4 BLEU، وكانت أسرع 10 أضعاف. لكن الأهم: أصبحت أساس BERT و GPT وكل النماذج الحديثة.' },
  { speaker: 'host', startMs: 52000, endMs: 57000, text: 'يعني GPT الذي نستخدمه اليوم بُني على هذه الورقة؟' },
  { speaker: 'guest', startMs: 57000, endMs: 65000, text: 'بالضبط! كل LLM حديث — ChatGPT، Claude، Gemini — جذوره في معمارية Transformer التي قدّمتها هذه الورقة عام 2017.' },
  { speaker: 'host', startMs: 65000, endMs: 72000, text: 'حقاً ورقة تاريخية. شكراً جزيلاً دكتورة سارة على هذا الشرح الواضح والممتع.' },
  { speaker: 'guest', startMs: 72000, endMs: 78000, text: 'العفو، شكراً لاستضافتي. وأنصح كل مهتم بالـ AI أن يقرأ هذه الورقة على الأقل مرة واحدة.' },
  { speaker: 'host', startMs: 78000, endMs: 83000, text: 'إلى لقاء قادم مع ورقة أخرى مثيرة. حافظوا على فضولكم!' },
]

export const PODCAST_DURATION_SEC = 83

/**
 * AI Model info card — replace this with the user's own model code/info.
 */
export const MODEL_INFO = {
  name: 'TransformerForTranslation',
  architecture: 'Encoder-Decoder · 6+6 layers · 8 heads · d_model=512',
  params: '65M parameters',
  accuracy: 'BLEU 28.4 (EN→DE), BLEU 41.8 (EN→FR)',
  description:
    'نموذج ترجمة آلية جاهز للاستخدام، مدرّب على WMT 2014. يدعم الترجمة من الإنجليزية إلى الألمانية أو الفرنسية، ومبني على معمارية Transformer الأصلية من ورقة Vaswani et al. 2017.',
  hyperparameters: [
    { key: 'd_model', value: '512' },
    { key: 'n_heads', value: '8' },
    { key: 'n_layers', value: '6' },
    { key: 'd_ff', value: '2048' },
    { key: 'dropout', value: '0.1' },
    { key: 'optimizer', value: 'Adam (β1=0.9, β2=0.98)' },
  ],
  examples: [
    { input: 'Hello, how are you?', output: 'مرحباً، كيف حالك؟' },
    { input: 'Attention is all you need.', output: 'الانتباه هو كل ما تحتاجه.' },
    { input: 'Machine learning is fascinating.', output: 'تعلم الآلة مذهل.' },
  ],
}

/**
 * Code preview snippet — shown in the code viewer card before download.
 */
export const CODE_SNIPPET = `# Transformer Model Implementation
# Generated by Monjez AI from "Attention Is All You Need"
import math
import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    """Scaled dot-product multi-head attention (Section 3.2.2)."""

    def __init__(self, d_model: int, n_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, q, k, v, mask=None):
        B = q.size(0)
        Q = self.W_q(q).view(B, -1, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(k).view(B, -1, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(v).view(B, -1, self.n_heads, self.d_k).transpose(1, 2)

        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn = torch.softmax(scores, dim=-1)
        attn = self.dropout(attn)
        out = torch.matmul(attn, V)

        out = out.transpose(1, 2).contiguous().view(B, -1, self.n_heads * self.d_k)
        return self.W_o(out)`

/**
 * Slides preview (titles only — full slides shown via PDF download).
 */
export const SLIDES_PREVIEW = [
  { num: 1, title: 'Attention Is All You Need', subtitle: 'مقدمة' },
  { num: 2, title: 'المشكلة', subtitle: 'لماذا RNN لا يكفي؟' },
  { num: 3, title: 'الفكرة الأساسية', subtitle: 'Self-Attention فقط' },
  { num: 4, title: 'Scaled Dot-Product Attention', subtitle: 'الصيغة الرياضية' },
  { num: 5, title: 'Multi-Head Attention', subtitle: '8 رؤوس متوازية' },
  { num: 6, title: 'البنية الكاملة', subtitle: 'Encoder + Decoder' },
  { num: 7, title: 'Positional Encoding', subtitle: 'تمثيل الترتيب' },
  { num: 8, title: 'النتائج التجريبية', subtitle: 'BLEU 28.4 / 41.8' },
  { num: 9, title: 'الأثر والإرث', subtitle: 'BERT, GPT, T5...' },
  { num: 10, title: 'شكراً', subtitle: 'أسئلة؟' },
]
