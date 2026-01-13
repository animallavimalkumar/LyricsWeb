import { Link } from "react-router-dom";

function TeluguLyrics() {
  const teluguSongs = [
    { id: "emaina", title: "ఏమైనా చేయగలవు – డేనియెల్ ప్రణీత్" },
    { id: "Krupamayuda", title: "కృపామయుడా – సురేష్ ఆర్" },
    { id: "ayanina", title: "ఆయనే నా సంగీతము" },
    { id: "davidu", title: "దావీదు వలె నాట్యమాడి" },
    { id: "dinamela", title: "దినమెల్ల నే పాడినా కీర్తించినా" },
    { id: "devunistuthyinchude", title: "దేవుని స్తుతియించుడి" },
    { id: "nastuti", title: "నా స్తుతి పాత్రుడా" },
    { id: "bhumiakashamulu", title: "భూమ్యాకాశములు సృజించిన" },
    { id: "randiyehovanu", title: "రండి యెహోవను" },
    { id: "lekinchaleni", title: "లెక్కించలేని స్తోత్రముల్" },
    { id: "srutichesi", title: "శృతిచేసి నే పాడనా స్తోత్ర గీతం" },
    { id: "stutinchedanenamam", title: "స్తుతియించెదా నీ నామం" },
    { id: "stutistothrahuda", title: "స్తుతి స్తుతి స్తోత్రార్హుడా" },
    { id: "sthuthisimhaasanaaseenudaa", title: "స్తుతి సింహాసనాసీనుడా" },
    { id: "SthothramChellintumu", title: "స్తోత్రం చెల్లింతుము" },
    { id: "hallelujahstutimahima", title: "హల్లెలూయ స్తుతి మహిమ" },
    { id: "hallelujahyani", title: "హల్లేలూయా యని పాడి" },
    { id: "praarthanavinedipaavanudaa", title: "ప్రార్థన వినెడి పావనుడా" },
    { id: "praardhanayesunisandarshana", title: "ప్రార్ధన యేసుని సందర్శన" },
    { id: "yehovaaneenaamamuenthobalamainadi", title: "యెహోవా నీ నామము" },
    {id:"InnaalluThoduga", title:"ఇన్నాళ్లు తోడుగా " },
    {id:"InthakaalamNeedukrupalo", title:" ఇంత కాలం నీదు కృపలో"},
    {id:"OohinchaleniMelulathoNimpina", title:" ఊహించలేని మేలులతో నింపిన "},
    {id:"KrupalanuThalanchuchu", title:" కృపలను తలంచుచు "},
    {id:"naakennomeluluchesithive", title:" నాకు ఎన్నో మేలులు చేసితివే "},
    {id:"neevuchesinaupakaaramulaku",title:"నీవు చేసిన ఉపకారములకు"},
    {id:"AthyunnathaSimhasanamupai", title:"అత్యున్నత సింహాసనముపై"},
    {id:"athyunnathasimhasanamupaiaseenuda",title:"అత్యున్నత సిహాసనముపైసీనుడా"},
    {id:"aninamamulakanapinamu", title:"అన్ని నామముల కన్న పై నామము"},
    {id:"EvaruSameepinchaleni", title:"ఎవరు సమీపించలేని "},
    {id:"yesamayamandain",title:"ఏ సమయమందైన "},
    {id:"kannathallicherchunatlu", title:"కన్నతల్లి చేర్చునట్లూ"},
    {id:"NaKanulakanniruthudachina", title:"నా కన్నుల కన్నీరు తుడిచిన యేసయ్యకే ఆరాధన"},
    {id:"Preminchedanadhikamuga", title:"ప్రేమించెదన్ అధికముగా "},
    {id:"bhajiyinthumu-ninu-jagadeeshaa",title:
      "భజియింతుము నిను జగదీశా"
    },
{id:"mahimaneekeprabhu",title:"మహిమ నీకే ప్రభు "},
{id:"rajaneebhavanamulu",title:"రాజా నీ భవనములో"},
{id:"yudhaastutigothrapu",title:"యూదా స్తుతి గోత్రపు "},
{id:"samipincharanitejasulo",title:"సమీపించరని తేజసులో "},
{id:"allaneredallo",title:"అల్లనే రేడల్లో "},
{id:"andalataraarudinche",title:"అందాల తార అరుదెంచె నాకై"},
{id:"abaranikiantela",title:"అంబరానికి అంటేలా"},
{id:"ohsadbhaktulara",title:"ఓ సద్భక్తులరా "},
{id:"kreesthuputtenu",title:"క్రీస్తు పుట్టెను "},
{id:"chithrachithraalavaade",title:"చిత్ర చిత్రాలవాడే "},
{id:"chinthaledika",title:"చింతలేదిక "},
{id:"ninumatramenenammanaya",title:"నిను మాత్రమే నే నమ్మనయా "},
{id:"thoorpudikuchukkabutte",title:"తూర్పు దిక్కు చుక్క బుట్టె"},
{id:"nayesurajunakai",title:"నా యేసు రాజు నాకై పుట్టిన రోజు "},
{id:"bethlehemupuramunadu",title:"బెత్లహేమ్ పురమునందు"},
  ];
  const column1 = teluguSongs.slice(0, 20);
  const column2 = teluguSongs.slice(20, 40);
  const column3 = teluguSongs.slice(40);

  return (
    <div className="lyrics-box">
      <style>{`
        .three-column-layout {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .column {
          width: 100%;
        }

        .song-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .song-list li {
          margin-bottom: 8px;
        }
      `}</style>

      <h2>Telugu Songs</h2>

      <div className="three-column-layout">
        {/* Column 1 */}
        <div className="column">
          <ul className="song-list">
            {column1.map((song, index) => (
              <li key={song.id}>
                <Link to={`/lyrics/song/${song.id}`}>
                  {index + 1}) {song.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="column">
          <ul className="song-list">
            {column2.map((song, index) => (
              <li key={song.id}>
                <Link to={`/lyrics/song/${song.id}`}>
                  {column1.length + index + 1}) {song.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="column">
          <ul className="song-list">
            {column3.map((song, index) => (
              <li key={song.id}>
                <Link to={`/lyrics/song/${song.id}`}>
                  {column1.length + column2.length + index + 1}) {song.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeluguLyrics;
