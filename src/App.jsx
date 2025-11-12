import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import FloatingButton from './components/FloatingButton';
import './App.css';

function App() {
  const audioVisualizerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showVisualizerOnly, setShowVisualizerOnly] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const featuresRef = useRef(null);

  const handlePlayClick = () => {
    setIsModalOpen(false);
    if (audioVisualizerRef.current) {
      audioVisualizerRef.current.togglePlay();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioVisualizerRef.current) {
      audioVisualizerRef.current.togglePlay();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current) {
        const { top } = featuresRef.current.getBoundingClientRect();
        setShowVisualizerOnly(top <= 135);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#28170e] text-white" lang="ar" dir="rtl">
      <Navbar audioVisualizerRef={audioVisualizerRef} showVisualizerOnly={showVisualizerOnly} />
      <main className="pt-32">
        <section
          className="relative bg-cover bg-center text-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605752995124-4a2580df5dff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1356')" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative mx-auto px-4 py-40">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">أصل  الطّيب</h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">اكتشف روعة العود الأصيل، رمز الفخامة والتقاليد العربية العريقة.</p>
          </div>
        </section>

        <section ref={featuresRef} className="py-24 bg-[#f1eedb]">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Feature 1 */}
              <div data-aos="fade-right" className="transform rounded-lg bg-white p-6 shadow-xl transition-transform hover:scale-105 flex items-center gap-6">
                <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className='size-10 text-[#28170e]' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 5.422V5c0-1.414 0-2.121.44-2.56C7.878 2 8.585 2 10 2s2.121 0 2.56.44C13 2.878 13 3.585 13 5v2H7V5.5M13 7H7" /><path d="M7 5c.552 0 1 .052 1-.5S7.552 4 7 4" /><path stroke-linecap="round" d="M2.161 16A7 7 0 0 1 2 14.495C2 10.355 5.582 7 10 7s8 3.356 8 7.495c0 1.915-.766 3.662-2.027 4.987c-.45.473-.676.709-1.62 1.114C13.41 21 12.76 21 11.459 21H8.542c-1.302 0-1.952 0-2.896-.404a7 7 0 0 1-.646-.31" /><path stroke-linecap="round" d="M2.5 13c1.435.58 3.143 1.73 5.36 1.98c2.49.28 3.995-1.396 6.14-1.685" /><path d="M13.5 5h.82a5 5 0 0 1 2.236.528L17.5 6" /><path d="M20.5 5.25c1.196.69 1.717 2.025 1.165 2.982c-.552.956-1.97 1.172-3.165.482s-1.717-2.026-1.165-2.982s1.97-1.173 3.165-.482Z" /></g></svg>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-[#28170e]">جودة استثنائية</h3>
                  <p className="mt-2 text-[#28170e]">نختار أجود أنواع العود من مصادره الأصلية لنقدم لك تجربة فريدة.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div data-aos="fade-up" className="transform rounded-lg bg-white p-6 shadow-xl transition-transform hover:scale-105 flex items-center gap-6">
                <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-[#28170e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-[#28170e]">تنوع فريد</h3>
                  <p className="mt-2 text-[#28170e]">مجموعة واسعة من منتجات العود التي تناسب جميع الأذواق والمناسبات.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div data-aos="fade-left" className="transform rounded-lg bg-white p-6 shadow-xl transition-transform hover:scale-105 flex items-center gap-6">
                <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className='size-10 text-[#28170e]'  viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382Z" /><path d="m21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5" opacity=".5" /></g></svg>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-[#28170e]">توصيل سريع</h3>
                  <p className="mt-2 text-[#28170e]">نوصل طلباتكم إلى جميع أنحاء المملكة في أسرع وقت ممكن.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#3a2214] text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">جاهز لتجربة أصالة العود؟</h2>
            <p className="mt-5 text-lg text-gray-300 max-w-3xl mx-auto">تصفح مجموعتنا الآن واحصل على خصم 20% على طلبك الأول.</p>
            <button className="mt-10 bg-white text-[#28170e] font-bold py-4 px-10 rounded-lg text-lg hover:bg-gray-200 transition-colors">
              تسوق الآن
            </button>
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-[#f1eedb]">فعِّل الصوت</h2>
              <p className="mb-4 text-[#f1eedb]">يتطلب المتصفح نقرة واحدة لبدء تشغيل الصوت. اضغط تشغيل لبدء المؤثر البصري والصوت.</p>
              <button 
                  onClick={handlePlayClick}
                  className="bg-[#28170e] hover:bg-[#3a2214] text-white font-bold py-2 px-4 rounded"
              >
                  تشغيل
              </button>
          </div>
        </Modal>
        <FloatingButton onClick={togglePlay} isPlaying={isPlaying} />
      </main>
    </div>
  );
}

export default App;
