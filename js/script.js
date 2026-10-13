document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Dark/Light Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.textContent = '☀️';
            }
        });
    }

    // 3. Back to Top Button
    const bttBtn = document.getElementById('btt-btn');
    if (bttBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) bttBtn.style.display = 'block';
            else bttBtn.style.display = 'none';
        });
        bttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Notification Helper
    function showNotification(message) {
        let notif = document.getElementById('app-notification');
        if (!notif) {
            notif = document.createElement('div');
            notif.id = 'app-notification';
            notif.className = 'notification';
            document.body.appendChild(notif);
        }
        notif.textContent = message;
        notif.classList.add('show');
        setTimeout(() => notif.classList.remove('show'), 3000);
    }

    // 4. Modals (Index Page / Explore Disciplines)
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-text');
    const modalClose = document.querySelector('.modal-close');
    
    // Some sample rich content for disciplines
    const disciplineData = {
        "🔎 Crime Scene Investigation": "<strong>Definition:</strong> The systematic process of documenting, collecting, and preserving physical evidence at a crime scene.<br><br><strong>Importance:</strong> Ensures evidence is untainted and admissible in court.<br><br><strong>Common evidence:</strong> Biological fluids, trace materials, impressions.<br><br><strong>Real-world application:</strong> First responders securing a scene and CSI units meticulously photographing and bagging items.",
        "🧬 DNA Forensics": "<strong>Definition:</strong> The analysis of genetic material to identify individuals.<br><br><strong>Importance:</strong> Highly accurate and statistically sound method of linking suspects to scenes.<br><br><strong>Common evidence:</strong> Blood, saliva, semen, hair roots.<br><br><strong>Real-world application:</strong> Exonerating the wrongfully convicted or identifying unknown remains using CODIS.",
        "🧪 Forensic Toxicology": "<strong>Definition:</strong> The study of the presence of poisons, drugs, and alcohol in biological specimens.<br><br><strong>Importance:</strong> Crucial for determining cause of death in overdoses or poisonings.<br><br><strong>Common evidence:</strong> Blood, urine, vitreous humor.<br><br><strong>Real-world application:</strong> Investigating DUIs and fatal overdoses.",
        "🖐 Fingerprint Analysis": "<strong>Definition:</strong> The examination of friction ridge skin patterns on fingers and palms.<br><br><strong>Importance:</strong> Every individual possesses unique fingerprints, making it a reliable identification method.<br><br><strong>Common evidence:</strong> Latent prints on glass, weapons, or doors.<br><br><strong>Real-world application:</strong> Running latent prints lifted from a burglary scene through AFIS."
    };

    if (modalOverlay) {
        document.querySelectorAll('.discipline-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                
                let textHTML = disciplineData[title];
                if (!textHTML) {
                    textHTML = `<strong>Definition:</strong> The study and application of ${title} in legal settings.<br><br><strong>Importance:</strong> Provides objective scientific findings to the justice system.<br><br><strong>Common evidence:</strong> Varies depending on the specific branch.<br><br><strong>Real-world application:</strong> Utilized daily by law enforcement worldwide.`;
                }
                
                modalTitle.textContent = title.replace(/[^a-zA-Z ]/g, "").trim();
                modalContent.innerHTML = textHTML;
                modalOverlay.classList.add('active');
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
        }
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }

    // 5. Virtual Crime Scene & Chain of Custody
    const evidenceMarkers = document.querySelectorAll('.evidence-marker');
    const evidenceList = document.getElementById('collected-evidence-list');
    const evidenceCounter = document.getElementById('evidence-counter');
    
    let collectedCount = 0;

    if (evidenceMarkers.length > 0) {
        evidenceMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                if (marker.classList.contains('collected')) return;
                
                const type = marker.getAttribute('data-type');
                
                if(confirm(`Inspect ${type}?\nDo you want to document and collect this evidence?`)) {
                    marker.classList.add('collected');
                    collectedCount++;
                    evidenceCounter.textContent = collectedCount;
                    
                    const li = document.createElement('li');
                    li.innerHTML = `<span><strong>${type}</strong></span> <span style="color: #22c55e;">Bagged & Tagged</span>`;
                    evidenceList.appendChild(li);
                    
                    showNotification(`Evidence Collected: ${type} securely packaged.`);
                    
                    // Simple logic to scroll to chain of custody once all items collected
                    if(collectedCount === evidenceMarkers.length) {
                        setTimeout(() => {
                            showNotification('All evidence collected! Proceeding to Chain of Custody.');
                            document.getElementById('chain-of-custody').scrollIntoView({behavior: 'smooth'});
                        }, 1500);
                    }
                }
            });
        });
    }

    // 6. Virtual Lab (DNA Comparison)
    const compareBtn = document.getElementById('compare-dna-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            compareBtn.disabled = true;
            compareBtn.style.background = '#94a3b8';
            compareBtn.textContent = "Running Electrophoresis Simulation...";
            
            const bands = document.querySelectorAll('.band');
            // Animate bands appearing
            bands.forEach((band, index) => {
                setTimeout(() => {
                    band.style.opacity = '1';
                }, index * 400); // staggering the reveal
            });
            
            setTimeout(() => {
                const res = document.getElementById('dna-result');
                res.style.opacity = '1';
                compareBtn.textContent = "Analysis Complete";
                showNotification("DNA Match Confirmed.");
            }, bands.length * 400 + 800);
        });
    }

    // 7. Case Quiz (Solve the Case)
    const quizData = [
        {
            q: "A person was found unconscious inside a room. Investigators recovered a glass, fingerprint, hair and bloodstain. Which evidence should be collected first?",
            options: ["A. Fingerprint", "B. Bloodstain", "C. Hair", "D. All relevant evidence according to proper scene protocol"],
            ans: 3,
            expl: "Proper scene protocol dictates prioritizing evidence that is transient or fragile, but all must be documented and collected systematically. Always follow protocol!"
        },
        {
            q: "What is Locard's Exchange Principle?",
            options: ["A. DNA is unique to each person", "B. Every contact leaves a trace", "C. Blood spatter reveals direction", "D. Fingerprints never change over time"],
            ans: 1,
            expl: "Edmond Locard's principle states that 'Every contact leaves a trace', meaning criminals will always bring something to the scene and leave with something from it."
        },
        {
            q: "Which chemical is commonly used to detect latent (invisible) blood at a crime scene?",
            options: ["A. Ninhydrin", "B. Cyanoacrylate", "C. Luminol", "D. Iodine fuming"],
            ans: 2,
            expl: "Luminol reacts with the iron in hemoglobin to produce a blue chemiluminescence, revealing trace amounts of blood."
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        let currentQ = 0;
        let score = 0;

        function renderQuiz() {
            if (currentQ >= quizData.length) {
                let msg = "";
                const percent = (score / quizData.length) * 100;
                if (percent >= 90) msg = "Excellent Forensic Investigator! You have a keen eye.";
                else if (percent >= 70) msg = "Good Investigation. A few details slipped by.";
                else if (percent >= 50) msg = "Keep Practicing. Review the basics of evidence collection.";
                else msg = "Review the Evidence. Forensics requires strict attention to detail.";

                quizContainer.innerHTML = `
                    <h3 style="color: var(--accent-red); margin-bottom: 1rem;">INVESTIGATION COMPLETE</h3>
                    <p style="font-size: 1.2rem;"><strong>Final Score:</strong> ${score}/${quizData.length} (${Math.round(percent)}%)</p>
                    <p style="margin: 1.5rem 0; font-size: 1.1rem;">${msg}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Restart Investigation</button>
                `;
                return;
            }

            const qInfo = quizData[currentQ];
            let html = `
                <h4 style="margin-bottom: 1rem;">Case Question ${currentQ + 1} of ${quizData.length}:</h4>
                <p style="font-size: 1.1rem;">${qInfo.q}</p>
                <div class="quiz-options">
            `;
            qInfo.options.forEach((opt, i) => {
                html += `<div class="quiz-option" data-idx="${i}">${opt}</div>`;
            });
            html += `</div>
                     <div class="quiz-feedback" style="display:none;"></div>
                     <button class="btn btn-primary mt-2" id="next-q-btn" style="display:none; margin-top:1.5rem;">Next Question</button>`;
            
            quizContainer.innerHTML = html;

            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.addEventListener('click', function() {
                    // Prevent multiple clicks
                    if (document.querySelector('.quiz-option.answered')) return; 
                    
                    document.querySelectorAll('.quiz-option').forEach(o => o.classList.add('answered'));
                    
                    const idx = parseInt(this.getAttribute('data-idx'));
                    const feedback = document.querySelector('.quiz-feedback');
                    
                    if (idx === qInfo.ans) {
                        this.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        this.style.borderColor = '#22c55e';
                        score++;
                        feedback.innerHTML = `<span style="color:#22c55e; font-weight: bold;">Correct!</span> <br>${qInfo.expl}`;
                    } else {
                        this.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                        this.style.borderColor = '#ef4444';
                        // Highlight the correct one
                        document.querySelector(`.quiz-option[data-idx="${qInfo.ans}"]`).style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        document.querySelector(`.quiz-option[data-idx="${qInfo.ans}"]`).style.borderColor = '#22c55e';
                        
                        feedback.innerHTML = `<span style="color:#ef4444; font-weight: bold;">Incorrect.</span> <br>${qInfo.expl}`;
                    }
                    feedback.style.display = 'block';
                    document.getElementById('next-q-btn').style.display = 'inline-block';
                });
            });

            document.getElementById('next-q-btn').addEventListener('click', () => {
                currentQ++;
                renderQuiz();
            });
        }
        
        const startBtn = document.getElementById('start-quiz-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.target.style.display = 'none';
                renderQuiz();
            });
        }
    }

    // 8. Glossary Search Filtering
    const searchInput = document.getElementById('glossary-search');
    const glossaryItems = document.querySelectorAll('.glossary-item');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            glossaryItems.forEach(item => {
                const termText = item.querySelector('h4').textContent.toLowerCase();
                const descText = item.querySelector('p').textContent.toLowerCase();
                if (termText.includes(query) || descText.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
