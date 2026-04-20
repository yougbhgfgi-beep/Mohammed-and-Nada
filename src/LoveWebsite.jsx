import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, Heart, Stars, Music } from "lucide-react";

export default function LoveWebsite() {
    const [isLogged, setIsLogged] = useState(false);
    const [password, setPassword] = useState("");
    const [showLetter, setShowLetter] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const [showFinalScene, setShowFinalScene] = useState(false);
    const [timeTogether, setTimeTogether] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const audioRef = React.useRef(null);

    const loveStartDate = new Date("2025-09-06T00:00:00");
    const { scrollYProgress } = useScroll();
    const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - loveStartDate;

            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            setTimeTogether({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (password.toUpperCase() === "MSFOREVER") {
            setIsLogged(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
            setTimeout(() => setShowLetter(true), 1200);
        } else {
            alert("كلمة السر خطأ، حاولي مرة تاني ❤️");
        }
    };

    const triggerSecret = () => {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
    };

    if (!isLogged) {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/wa_video_2026_02_11_2135.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-center text-white shadow-2xl max-w-sm w-full"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white/20 p-4 rounded-full shadow-lg animate-pulse">
                            <Heart className="text-pink-400" size={50} fill="currentColor" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold mb-8 font-serif drop-shadow-md">افتح قلبي يا قلبي ❤️</h1>

                    <div className="flex justify-center mb-8">
                        <input
                            type="password"
                            placeholder="كلمة السر"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:scale-105"
                    >
                        دخول
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 text-gray-800 overflow-hidden relative">
            <audio ref={audioRef} src="/music.mp3" loop />

            <button
                onClick={() => {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                }}
                className={`fixed top-4 left-4 z-50 bg-white/80 p-3 rounded-full shadow-lg text-pink-600 hover:bg-white transition-all duration-300 ${isPlaying ? "animate-spin" : ""}`}
            >
                <Music size={24} />
            </button>

            {/* Secret Popup */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <div className="bg-white px-16 py-10 rounded-3xl text-4xl font-bold text-pink-600 shadow-2xl">
                            بحبك ❤
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                    >
                        <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl text-right" dir="rtl">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">رسالة من قلبي</h2>
                                <button onClick={() => setShowLetter(false)} className="text-gray-500 hover:text-red-500">
                                    إغلاق
                                </button>
                            </div>

                            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                                <p>طلاما بتقري دلوقتي يا دوسا فعاوز كدا اقولك انك مش اي حد انتي اغلى حد على قلبي وجودك فحياتي أجمل صدفة حصلتلي انا بقيت شايف انو قدرنا وعشان نكون سوا وعشان مش ابعد عنك انا دعيت ربنا بالفرحة وبعدها انتي ظهرتي فحياتي مكنتش اتخيل عموما أن حبيبتي ممكن تكون بالجمال دا لحد ما عرفتك</p>

                                <p>انتي الشخص اللي بيفهمني دايما بدون ما اتكلم بجد والي بيكفيني حرفيا ومش بيخليني عاوز حاجة من الدنيا غير انو يكون معايا دايما بحس معاكي براحة ونا بتكلم وبحس بالأمان بجد بكون مرتاح ومسترخي لأبعد حد متكيف لدرجة بنام ونا بتكلم كلمة منك بتطيب خاطري وتغير مزاجي وبجد بكون مقفول من حياتي وبس أجي واتكلم معاكي بنسى كل التعب وكلامك بيواسيني حتى وانا زعلان انتي الوحيدة الي كل حاجة معاها حلوا وبتفرقي عن الكل وخليكي عارفة انك Just for me</p>

                                <p>بجد سوا كلام سوا حب سوا عتاب سوا زعل سوا ضحك الوقت الي بيكون معاكي حلو جداا كل الي عاوزو من الدنيا اني اشوفك دايما مبسوطة هادية مطمنة وأشوف دايما الفرحة فعيونك انتي معوضاني عن ناس وحاجات كتير يشيخهه بحبك وبعشقكك وأدمنت وجودك معايا ودي أكبر نعمة انتي انسانة متتوصفيش من جمالك سوا برا او جوا يجدعع ربنا يديمك ليا وربنا بحبكككككك بجد بعشقك بموووتتت فيكي مش عارف عملت اي فحياتي عشان تيجي واحدة زيك فحياتيي ولله بكون بخير وكويس ومبسوط طول منا معاكي وانتي معايا بتفرحيني بتدخلي البهجة على يومي وحياتي كلها يكل حياتي وتعرفي تطلعيني ازاي من زعلي وفيكي كل حاجة حلوا ويجوا فالآخر يقولوا ليه بتحبها الحب دا كلو؟ ولله لو اشكرك من هنا لبكرا مش هخلص</p>

                                <p>انتي لو تعرفي قد اي بحبك قد اي مش بقبل عليكي الوحش مش هقولك اهلي عارفين بحبك قد اي لا دا أي حد معدي فالشارع لما بيشوف الفرحة الي انا فيها ونا بكلمك تشرح كل حاجة وانا مغلطتش لما حبيتك بحبككك يشيخة مش عارف حتى اقول اي وازاي اعبر عن الي فقلبي لكن محظوظ جدا بيكي لدرجة متتخيليهاش ولله حظي مفيش منو عشانك انتي حبيبتي وانا اساسا بقول أن حظي فالدنيا دي كلها كان بس عشان قابلتك ويارب لآخر العمر سوا سوا بحمد ربنا عليكي وانك دخلتي فحياتي ينور عيني لانك فعلا عوضتيني عن المل وكل ما اشوف رسالة منك قلبي الي بيضحك قبل وشي انتي الوحيدة الي كل مابقعد معاها أحس الدنيا بخير انتي مش بس حبيبتي انتي اختي وروحي وعيوني الاتنين انتي كل دنيتي وروحي وكلو عارف انك دنيتي كلها حرفيا سرقتي كل عقلي وتفكيري والحب الي فقلبي</p>

                                <p>مكنتش اتوقع ابدا انك تعملي فيا كل دا لدرجة مش قادر من يوم ماعرفتك اوصف كمية الحب الي جوايا ليكي الكلام عجز عن الوصف. أما عن غيرتي عليكي فالغيوم حتى بتغير على قمرها وتخبيه مابالك بيا وانتي نور حياتي؟ عارف انو مش عندك فكرة عن الي ممكن اعملو بس حرفيا مش ببالغ بغير عليكي من هدومك من أهلك من بواب العمارة الي بيشوفك حتى من بتاع السوبر ماركت الي بتجيبي من عندو حاجات انا دايما بتريق على بتوع حب التملك مع اني اكتر انسان متملك هتشوفيه ومجنوووونننن جنان غير طبيعي يخليني أعمل أي حاجة عشان أطفي النار الي جوايا يعااممم وجودك بيخلق فيا حب الحياة وهتفضلي اختي الي قلبي مبسوط فيها وحبيبتي الي جابتهالي الدنيا والي مش هسمح تروح مني ، مهما كتروا الناس هتفضلي انتي الحتة الي فالمنتصف وتميل الى اليسار قليلا والله يديمك ليا واحسك داخلة فاعماق اعماق قلبي كتر مابحبك انتي انتي احلى حاجة في حياتي من يوم دخلتيها بقت حلوا عشانك فيها بسسس.</p>

                                <p className="font-bold text-xl text-center text-pink-600 mt-6">I LOVE YOU SOOOOO MUCH SANDOSTYYYY 😍😍😍😍😍💍👑💗✨🌍🫂</p>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button onClick={() => setShowLetter(false)} className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
                                    بختمها بحبك ❤️
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Scene Overlay */}
            <AnimatePresence>
                {showFinalScene && (
                    <FinalSceneComponent onClose={() => setShowFinalScene(false)} />
                )}
            </AnimatePresence>

            {/* Hero Cinematic */}
            <motion.section style={{ scale: scaleHero }} className="text-center py-32 px-4 text-gray-800">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6">سندس ❤️ M</h1>
                <p className="text-xl md:text-2xl mb-6">قصة حب مكتوبة للابد</p>

                <div className="bg-white/40 backdrop-blur-md border border-pink-200 p-6 rounded-3xl shadow-xl max-w-2xl mx-auto my-4 transform transition-all hover:scale-105">
                    <p className="text-2xl md:text-4xl text-pink-600 mt-2 font-bold leading-relaxed pt-2 pb-2" style={{ lineHeight: '1.6' }}>
                        سأبقى احبك حتى وانا بعيد عنك دائما<br/>فـ المسافة لا تغير شئ بقلبى ♥🍂
                    </p>
                </div>

                <button
                    onClick={triggerSecret}
                    className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-xl"
                >
                    زر المفاجأة
                </button>
            </motion.section>

            {/* Timeline Memories */}
            <section className="py-24 bg-white/70">
                <h2 className="text-4xl font-bold text-center mb-16 px-4 text-gray-800">خط ذكرياتنا</h2>
                <div className="relative max-w-4xl mx-auto px-4">
                    <div className="absolute left-1/2 top-0 w-1 bg-pink-400 h-full hidden md:block" />

                    {[
                        { text: "أول تعارف", date: "6/9/2025" },
                        { text: "أول ضحكة سوا", date: "8/9/2025" },
                        { text: "أول خروجة", date: "15/9/2025" },
                        { text: "الاعتراف بالحب", date: "20/9/2025" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`mb-16 flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} justify-center`}
                        >
                            <div className="bg-pink-500 text-white p-6 rounded-2xl w-80 shadow-xl">
                                <div className="font-bold">{item.text}</div>
                                <div className="text-sm mt-1">{item.date}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Luxury Gallery */}
            <section className="py-24 text-center px-4">
                <h2 className="text-4xl font-bold mb-16 text-gray-800">صورنا</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        { src: "/img1.jpg", caption: "كان احلى يوم يا نور عيني 🥺♥️\nاليوم اللي اتخصمنا بسببه علشان مش كنتي راضيه 😂♥️\nبحبكك قوي قوي يا سندس 😍🫶" },
                        { src: "/img2.jpg", caption: "وجودك معايا بيطمني.. حبيبتي اللي بجد بتحلي دنيتي ✨💍" },
                        { src: "/img3.jpg", caption: "كل تفصيله فيكي بتخطف قلبي.. بحبك يا أغلى ناسي 🌏💞" }
                    ].map((img, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl shadow-2xl relative group overflow-hidden"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div className="bg-white aspect-[9/16] md:h-96 rounded-2xl flex flex-col items-center justify-start overflow-hidden relative cursor-pointer">
                                <img
                                    src={img.src}
                                    alt={`Love Memory ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium whitespace-pre-line">{img.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setSelectedImage(null)}>×</button>
                    <img src={selectedImage} alt="expanded" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            {/* Sea Section */}
            <section className="py-24 bg-gradient-to-b from-blue-300 to-cyan-400 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-4xl mx-auto px-6"
                >
                    <h2 className="text-5xl font-bold mb-8 drop-shadow-lg">مكانا المفضل 🌊</h2>
                    <p className="text-3xl font-serif leading-relaxed drop-shadow-md">
                        "مكانا المفضل هو البحر عشان احنا عارفين ان حبنا زيو مليان اسرار"
                    </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white/30"></path>
                    </svg>
                </div>
            </section>

            {/* Counter */}
            <section className="py-24 bg-white/70 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">من يوم 6/9/2025 واحنا مع بعض</h2>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                    <TimeBox label="سنين" value={timeTogether.years} />
                    <TimeBox label="شهور" value={timeTogether.months} />
                    <TimeBox label="أيام" value={timeTogether.days} />
                    <TimeBox label="ساعات" value={timeTogether.hours} />
                    <TimeBox label="دقائق" value={timeTogether.minutes} />
                    <TimeBox label="ثواني" value={timeTogether.seconds} />
                </div>
            </section>

            <footer className="text-center py-10 flex flex-col items-center gap-4 hidden-print">
                <p className="text-gray-600">For the rest of our life ❤</p>
                <button
                    onClick={() => setShowFinalScene(true)}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition-all shadow-lg hover:scale-110 active:scale-95"
                >
                    النهاية
                </button>
                <p className="text-pink-600 font-bold mt-4 text-xl">Me guasta stü</p>
            </footer>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">{value || 0}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
}

function FinalSceneComponent({ onClose }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timeouts = [];
        timeouts.push(setTimeout(() => setStep(1), 500));
        timeouts.push(setTimeout(() => setStep(2), 3000)); 
        timeouts.push(setTimeout(() => setStep(3), 8000)); 
        timeouts.push(setTimeout(() => setStep(4), 13000));
        timeouts.push(setTimeout(() => setStep(5), 18000));
        timeouts.push(setTimeout(() => setStep(6), 23000));
        timeouts.push(setTimeout(() => setStep(7), 28000));
        timeouts.push(setTimeout(() => setStep(8), 33000));
        timeouts.push(setTimeout(() => setStep(9), 38000));

        timeouts.push(setTimeout(() => setStep(10), 44000));
        timeouts.push(setTimeout(() => setStep(11), 45000));
        timeouts.push(setTimeout(() => setStep(12), 48000));
        timeouts.push(setTimeout(() => setStep(13), 53000));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-center p-8 overflow-y-auto"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white text-sm"
            >
                خروج
            </button>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: Math.random() * 100 + "%", y: "100%" }}
                        animate={{ opacity: [0, 1, 0], y: "-10%" }}
                        transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute text-pink-500/20"
                    >
                        {i % 2 === 0 ? <Heart size={20 + Math.random() * 30} /> : <Stars size={20 + Math.random() * 30} />}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-2xl w-full flex flex-col items-center justify-center min-h-[60vh]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h2
                            key="step1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="text-7xl font-bold text-pink-500"
                        >
                            بحبك..
                        </motion.h2>
                    )}

                    {step >= 2 && step < 10 && (
                        <motion.div key="seq" className="space-y-8" dir="rtl">
                            {step >= 2 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl text-white font-semibold leading-relaxed">طلاما بتقري دلوقتي يا دوسا فعاوز كدا اقولك انك مش اي حد انتي اغلى حد على قلبي وجودك فحياتي أجمل صدفة حصلتلي</motion.p>}
                            {step >= 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-pink-200">انتي الشخص اللي بيفهمني دايما بدون ما اتكلم بجد والي بيكفيني حرفيا ومش بيخليني عاوز حاجة من الدنيا غير انو يكون معايا</motion.p>}
                            {step >= 4 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/90">بجد سوا كلام سوا حب سوا عتاب سوا زعل سوا ضحك الوقت الي بيكون معاكي حلو جداا</motion.p>}
                            {step >= 5 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-rose-300">كل الي عاوزو من الدنيا اني اشوفك دايما مبسوطة هادية مطمنة وأشوف دايما الفرحة فعيونك</motion.p>}
                            {step >= 6 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/90">انتي لو تعرفي قد اي بحبك قد اي مش بقبل عليكي الوحش</motion.p>}
                            {step >= 7 && <motion.p initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="text-2xl font-bold text-pink-500">انا دايما بتريق على بتوع حب التملك مع اني اكتر انسان متملك هتشوفيه ومجنوووونننن</motion.p>}
                            {step >= 8 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/80">مهما كتروا الناس هتفضلي انتي الحتة الي فالمنتصف وتميل الى اليسار قليلا</motion.p>}
                            {step >= 9 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl text-yellow-300 font-bold">I LOVE YOU SOOOOO MUCH SANDOSTYYYY 😍💍👑💗</motion.p>}
                        </motion.div>
                    )}

                    {step >= 11 && (
                        <motion.div key="final" className="flex flex-col items-center">
                            <motion.h1 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-8">سندس ❤️ M</motion.h1>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-white flex items-center gap-2"><span>إلى ما لا نهاية</span><motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>♾️</motion.span></motion.div>
                            {step >= 12 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xl text-gray-400 mt-6 font-serif italic">For the rest of our life.</motion.p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {step >= 13 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-10 text-xl font-bold text-pink-500">Me guasta stü</motion.div>}
        </motion.div>
    );
}
