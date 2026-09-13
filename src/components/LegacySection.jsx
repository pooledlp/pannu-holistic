import React from "react";
const products = [
  {
    name: "Dental Probiotics with Hydroxyapatite",
    price: "$59.00",
    details:
      "Supports oral microbiome balance while helping strengthen enamel with hydroxyapatite minerals.",
  },
  {
    name: "Detox Whitening Hydroxyapatite Mineral Toothpaste",
    price: "$29.00",
    details:
      "A non-toxic daily toothpaste designed for gentle whitening, remineralization, and fresh breath support.",
  },
  {
    name: "Holistic Gum Oil Pulling",
    price: "$13.00",
    details:
      "Traditional botanical oil blend to support gum comfort, oral cleansing, and daily wellness routines.",
  },
  {
    name: "Super Ozone Oil",
    price: "$19.00",
    details:
      "Concentrated ozone-infused oil often used for targeted oral care and supportive gum maintenance.",
  },
];
const smileCases = [
  {
    file: "case1.png",
    alt: "Case 1 smile transformation before and after",
    title: "Myofunctional Therapy + Airway + Habit Correction (pacifier)",
    text: "Care focused on tongue posture, breathing habits, and pacifier use. The photographs show this patient’s dental appearance at different stages.",
  },
  {
    file: "case2.png",
    alt: "Case 2 smile transformation before and after",
    title: "Myofunctional Therapy + Habit Correction (tongue thrust)",
    text: "Care focused on tongue thrust and oral muscle habits. Assessment and treatment needs differ for each patient.",
  },
  {
    file: "case3.png",
    alt: "Case 3 smile transformation before and after",
    title: "Myofunctional Therapy + Airway + Habit Correction + Ozone therapy",
    text: "This individual care plan included oral muscle work, breathing habits, and ozone as an adjunct. A combined case cannot show which treatment caused a change.",
  },
];
export default function LegacySection({kind}){const base="/";
if(kind==="/about/")return (<section className="about-section" id="about">
        <div className="container reveal">
          <div className="about-copy">
            <div className="bio-card bio-layout">
              <div className="about-visual">
                <div className="about-frame">
                  <img
                    src={`${base}Taren2.png`}
                    alt="Portrait of Taren Pannu"
                    className="about-img"
                  />
                </div>
              </div>

              <div>
                <div className="about-name">Taren Pannu, RDHAP, BS</div>
              <p>
                Taren Pannu is a dental and airway health practitioner dedicated
                to holistic, functional, and integrative dental care. Her
                approach is grounded in the belief that oral health is closely
                connected to overall wellness.
              </p>

              <p>
                She began her career as a dentist in India, building a strong
                foundation in dental surgery. Her early training was influenced
                by Ayurvedic and homeopathic practices, shaping her appreciation
                for prevention-focused and natural healing approaches. After
                moving to the United States, Mrs. Pannu earned her Bachelor of
                Science with honors from Thomas Edison State University in New
                Jersey and Registered Dental Hygienist in Alternative Practice
                (RDHAP) certification from the University of the Pacific.
              </p>

              <p>
                She pursued advanced training in myofunctional therapy and
                became certified in Buteyko breathing, expanding her focus to
                include airway health, breathing, jaw development, and sleep as
                essential components of dental care.
              </p>

              <p>
                Her focus is helping patients understand the factors behind their oral health concerns. She brings a preventive, airway-centered perspective to dental hygiene and explains treatment choices, evidence, and limitations so patients can make informed decisions.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>);
if(kind==="/products/")return (<section className="section" id="products">
        <div className="container">
          <div className="products-wrap reveal">
            <div className="products-inner">
              <div className="glass-box">
                <small>Products</small>
                <h2>Keep your care going at home</h2>
                <p>
                  Ask which products fit your needs, how to use them, and what evidence supports them. Products are optional additions to your routine; they do not replace brushing, cleaning between teeth, or necessary dental treatment.
                </p>

                <div className="product-grid">
                  {products.map((product) => (
                    <div className="product-card" key={product.name}>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                      <p>{product.details}</p>
                      <a href="/contact/" className="button button-primary">
                        Contact to order
                      </a>
                    </div>
                  ))}
                </div>

                <p>
                  Need help deciding? Visit our Contact section and share your
                  current concerns (sensitivity, gum support, whitening goals,
                  or remineralization) so we can recommend the best fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>);
if(kind==="/patient-stories/")return (<section className="section" id="smile-journey">
        <div className="container">
          <div className="section-head">
            <small>Transformations:</small>
            <h2>Individual care. Individual progress.</h2>
            <p>
              Examples from the practice’s treatment journeys. Results vary; these images do not establish improvements in breathing or sleep, or guarantee that braces or surgery can be avoided.
            </p>
          </div>
          <div className="smile-journey reveal">
            <div className="smile-track">
              {smileCases.map((item, index) => (
                <div className="tooth-stage" key={item.file}>
                  <img className="tooth-image" src={`${base}${item.file}`} alt={item.alt} loading="lazy" />
                  <p><strong>Case {index + 1}:</strong> {item.title}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>);
if(kind==="/questions/")return (<section className="section evidence-section" id="care-questions">
        <div className="container">
          <div className="section-head"><small>Science, made understandable</small><h2>A whole-body perspective. Clear answers.</h2><p>Holistic care should help you make informed choices. Here is what the evidence means for common patient questions.</p></div>
          <div className="patient-questions">
            <details><summary>Can gum treatment prevent autoimmune or systemic disease?</summary><p>Gum disease is associated with several health conditions, and the relationship with diabetes goes both ways. An association does not prove that dental treatment prevents autoimmune disease, heart disease, or other systemic conditions. Treating your gums matters for your oral health and belongs alongside appropriate medical care. <a href="https://www.nidcr.nih.gov/news-events/nidcr-news/2024/healthy-mouth-healthy-body" target="_blank" rel="noreferrer">Read the NIH overview ↗</a></p></details>
            <details><summary>Can myofunctional therapy help with sleep apnea?</summary><p>Mouth and facial exercises may help selected patients as part of a treatment plan. Snoring, gasping during sleep, or persistent daytime sleepiness deserve medical evaluation. Exercises do not replace a sleep study, CPAP, or other prescribed treatment. <a href="https://www.nhlbi.nih.gov/health/sleep-apnea/treatment" target="_blank" rel="noreferrer">Explore NIH treatment guidance ↗</a></p></details>
            <details><summary>Can inflamed gums and early tooth decay improve?</summary><p>Plaque-related gingivitis can often be reversed with effective home care and professional cleaning. Periodontitis needs ongoing management. Early decay before a hole forms may be arrested or remineralized with appropriate care; established cavities need a dental assessment. Fluoride and other established preventive options have evidence that varies by the type of lesion. <a href="https://www.nidcr.nih.gov/health-info/oral-hygiene" target="_blank" rel="noreferrer">NIH gum-care guidance ↗</a> · <a href="https://www.ada.org/resources/ada-library/oral-health-topics/caries-risk-assessment-and-management" target="_blank" rel="noreferrer">ADA prevention guidance ↗</a></p></details>
            <details><summary>How strong is the evidence for ozone?</summary><p>Evidence depends on the proposed use. A systematic review found insufficient, very-low-certainty evidence to recommend ozone for treating tooth decay. Ask about the expected benefit, delivery method, safety precautions, and established alternatives before choosing it. <a href="https://pubmed.ncbi.nlm.nih.gov/33303100/" target="_blank" rel="noreferrer">Read the research review ↗</a></p></details>
          </div>
          <a className="button button-primary questions-cta" href="/contact/">Discuss your concerns with us ↗</a>
        </div>
      </section>);
return null;
}
