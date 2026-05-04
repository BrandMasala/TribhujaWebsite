import React from 'react';
import SectionGate from './SectionGate';

const AmenityCard = ({ title, desc }) => (
  <div style={{ padding: '20px 24px', border: '.5px solid rgba(18,7,2,.12)' }}>
    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(.85rem,1.2vw,1.1rem)', color: 'rgba(18,7,2,.88)', marginBottom: '8px' }}>{title}</div>
    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.88rem', color: 'rgba(18,7,2,.55)', lineHeight: 1.7 }}>{desc}</div>
  </div>
);

const OutdoorCard = ({ title, desc }) => (
  <div style={{ padding: '16px 0 0' }}>
    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(.8rem,1vw,.95rem)', color: 'rgba(18,7,2,.88)' }}>{title}</div>
    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', color: 'rgba(18,7,2,.55)', lineHeight: 1.7, marginTop: '4px' }}>{desc}</div>
  </div>
);

const GardenCard = ({ title, desc }) => (
  <div style={{ padding: '28px 20px', border: '.5px solid rgba(18,7,2,.12)' }}>
    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(.85rem,1.2vw,1.1rem)', color: 'rgba(18,7,2,.88)', marginBottom: '10px' }}>{title}</div>
    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.88rem', color: 'rgba(18,7,2,.55)', lineHeight: 1.7 }}>{desc}</div>
  </div>
);

const Amenities = () => {
  return (
    <section id="tribhuja">
      <SectionGate num="03" isLogo={true} en="Form" theme="dark" />

      {/* S9: CLUBHOUSE */}
      <div className="ps" id="s9-clubhouse" data-theme="dark">
        <div className="ps-inner" style={{ maxWidth: '900px' }}>
          <div className="eyebrow reveal">Tribhuja &nbsp;&middot;&nbsp; Tri Clubhouse</div>
          <h2 className="hl reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>Tribhuja</h2>
          <p className="sh reveal" style={{ fontSize: 'clamp(.8rem, 1.4vw, 1.1rem)', marginBottom: '24px' }}>Clubhouse</p>
          <div className="rule reveal"></div>
          <p className="bd reveal">Largest clubhouse in Kollur. 1,00,000 SFT, excluding outdoor amenities.</p>

          <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="reveal">
            <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/9' }}>
               <img src="/assets/images/clubhouse-aerial-23.jpg" alt="Clubhouse Aerial" className="asset-img-hover" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                <img src="/assets/images/clubhouse-lobby-24.jpg" alt="Lobby" className="asset-img-hover" />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                <img src="/assets/images/cycle-track-30.jpg" alt="Cycle Track" className="asset-img-hover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* S9: AMENITIES GRID */}
      <div className="ps" id="s9-amenities" data-theme="copper">
        <div className="ps-inner" style={{ maxWidth: '900px' }}>
          <div className="eyebrow reveal">Tribhuja &nbsp;&middot;&nbsp; Amenities</div>
          <h2 className="hl reveal" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            The Architecture<br />of Living.
          </h2>
          <div className="rule reveal"></div>

          {/* Indoor Amenities */}
          <div style={{ marginTop: '20px' }} className="reveal" data-r="2">
            <p className="sh" style={{ fontSize: 'clamp(.65rem, 1vw, .85rem)', marginBottom: '32px', color: 'rgba(18,7,2,.55)' }}> Indoor &nbsp;&middot;&nbsp; Tribhuja Clubhouse </p>
            
            {/* Gym + Yoga */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                <img src="/assets/images/gym-yoga-25.jpg" alt="Gym" className="asset-img-hover" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <AmenityCard title="Gymnasium" desc="Cross-fit equipment. Cycling zone. Cardio floor." />
                <AmenityCard title="Yoga" desc="Dedicated indoor yoga and aerobics studio." />
              </div>
            </div>

            {/* Dance + Badminton */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                  <AmenityCard title="Dance Room" desc="Full-size mirrored studio with wooden flooring." />
                  <AmenityCard title="Badminton Court" desc="Multiple indoor courts. Professional lighting." />
               </div>
               <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                  <img src="/assets/images/dance-badminton-26.jpg" alt="Dance & Badminton" className="asset-img-hover" />
               </div>
            </div>

            {/* Banquet + Theatre */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                <img src="/assets/images/banquet-theatre-27.jpg" alt="Banquet & Theatre" className="asset-img-hover" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <AmenityCard title="Banquet Hall" desc="Full-service banquet for occasions that deserve an address." />
                <AmenityCard title="Theatre" desc="Private screening room. Recliner seating. Surround sound." />
              </div>
            </div>

            {/* Play Room + Multiuse */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                  <AmenityCard title="Play Room" desc="Indoor games. Table tennis. Carrom. Foosball." />
                  <AmenityCard title="Multiuse Room" desc="Music studio. Brick-wall lounge. Drums. Guitars." />
               </div>
               <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                  <img src="/assets/images/play-multiuse-28.jpg" alt="Play & Multiuse" className="asset-img-hover" />
               </div>
            </div>
          </div>

          {/* Outdoor Amenities */}
          <div style={{ marginTop: '64px' }} className="reveal" data-r="3">
            <p className="sh" style={{ fontSize: 'clamp(.65rem, 1vw, .85rem)', marginBottom: '32px', color: 'rgba(18,7,2,.55)' }}>Outdoor &nbsp;&middot;&nbsp; The Grounds</p>
            
            {/* Amphitheatre */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/9' }}>
                <img src="/assets/images/amphitheatre-31.jpg" alt="Amphitheatre" className="asset-img-hover" />
              </div>
              <OutdoorCard title="Amphitheatre" desc="Open-air stepped seating. Community performances." />
            </div>

            {/* Sports + Pool */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                  <img src="/assets/images/outdoor-sports-32.jpg" alt="Outdoor Sports" className="asset-img-hover" />
                </div>
                <OutdoorCard title="Outdoor Sports" desc="Futsal. Basketball. Volleyball. Tennis. Sandpit." />
              </div>
              <div>
                <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                  <img src="/assets/images/gym-pool-outdoor-33.jpg" alt="Pool" className="asset-img-hover" />
                </div>
                <OutdoorCard title="The Pool" desc="Leisure pool. Fitness pool. Wading pool. Kids pool. Infinity edge." />
              </div>
            </div>

            {/* Yoga Outdoor + Other Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '16/10' }}>
                  <img src="/assets/images/yoga-outdoor-34.jpg" alt="Outdoor Yoga" className="asset-img-hover" />
                </div>
                <OutdoorCard title="Yoga" desc="Pergola-covered deck. Open-air meditation." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                 <div style={{ padding: '20px 24px', border: '.5px solid rgba(18,7,2,.12)' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(.8rem,1vw,.95rem)', color: 'rgba(18,7,2,.88)', marginBottom: '6px' }}>Cycle Track</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', color: 'rgba(18,7,2,.55)', lineHeight: 1.7 }}>Dedicated cycling path. Skating loop.</div>
                 </div>
                 <div style={{ padding: '20px 24px', border: '.5px solid rgba(18,7,2,.12)' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(.8rem,1vw,.95rem)', color: 'rgba(18,7,2,.88)', marginBottom: '6px' }}>Kids &amp; Toddler Park</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', color: 'rgba(18,7,2,.55)', lineHeight: 1.7 }}>Trampoline park. Tree house. Age-separated play.</div>
                 </div>
              </div>
            </div>
          </div>

          {/* Tranquil Gardens */}
          <div style={{ marginTop: '64px' }} className="reveal" data-r="3">
            <p className="sh" style={{ fontSize: 'clamp(.65rem, 1vw, .85rem)', marginBottom: '32px', color: 'rgba(18,7,2,.55)' }}>Tranquil &nbsp;&middot;&nbsp; The Gardens</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '28px 32px' }}>
              <GardenCard title="Herbal Garden" desc="Curated herbs. Fragrant pathways." />
              <GardenCard title="Sensory Garden" desc="Textured plants. Water features." />
              <GardenCard title="Community Garden" desc="Shared plots. Seasonal vegetables." />
              <GardenCard title="Putting Green" desc="Manicured practice green." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
