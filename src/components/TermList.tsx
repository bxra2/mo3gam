import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface Term {
  slug: string
  data: {
    term: string
    translation: string
    category?: string
    derivation?: string
    references?: { label: string; url?: string }[]
  }
  body: string
}

interface TermListProps {
  initialTerms: Term[]
}

export default function TermList({ initialTerms }: TermListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTerms = initialTerms.filter(
    (term) =>
      term.data.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.data.translation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='space-y-16'>
      {/* Search Section */}
      <div className='relative max-w-2xl mx-auto'>
        <div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-slate-400' />
        </div>
        <input
          type='text'
          placeholder='ابحث عن مصطلح أو ترجمة...'
          className='w-full bg-white border border-slate-200 rounded-xl py-4 pr-12 pl-4 text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredTerms.map((term, index) => (
          <motion.a
            key={term.slug}
            href={`${import.meta.env.BASE_URL}terms/${term.slug}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className='academic-card group cursor-pointer p-8 rounded-xl flex flex-col justify-between h-full no-underline'
          >
            <div>
              <div className='flex flex-wrap items-start justify-between gap-2 mb-2'>
                <h3 className='text-2xl font-bold text-slate-900 group-hover:text-accent transition-colors leading-tight'>
                  {term.data.translation}
                </h3>
                <div className='flex flex-wrap flex-col items-end justify-between gap-2 mb-2'>
                  {term.data.derivation && (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200'>
                      {term.data.derivation}
                    </span>
                  )}
                  {term.data.category && (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200'>
                      {term.data.category}
                    </span>
                  )}
                </div>
              </div>
              <p className='mt-3 text-lg text-slate-500 font-medium tracking-wide font-sans dir-ltr text-right'>
                {term.data.term}
              </p>
            </div>
            <div className='mt-8 flex items-center text-sm font-bold text-accent/70 group-hover:text-accent transition-all'>
              عرض التفاصيل ←
            </div>
          </motion.a>
        ))}
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className='text-center py-24'>
          <p className='text-2xl text-slate-400 font-medium italic'>
            لم يتم العثور على نتائج تطابق بحثك.
          </p>
        </div>
      )}
    </div>
  )
}
