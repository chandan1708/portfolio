import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import all translation files
import en from "./en.json";
import ar from "./ar.json";
import bg from "./bg.json";
import ca from "./ca.json";
import cs from "./cs.json";
import da from "./da.json";
import de from "./de.json";
import es from "./es.json";
import et from "./et.json";
import fi from "./fi.json";
import fr from "./fr.json";
import hr from "./hr.json";
import hu from "./hu.json";
import it from "./it.json";
import ja from "./ja.json";
import ko from "./ko.json";
import lt from "./lt.json";
import nl from "./nl.json";
import no from "./no.json";
import pt from "./pt.json";
import ro from "./ro.json";
import ru from "./ru.json";
import sv from "./sv.json";
import uk from "./uk.json";
import vi from "./vi.json";
import zh from "./zh.json";
import kn from "./kn.json";
import hi from "./hi.json";
import gu from "./gu.json";
import mr from "./mr.json";
import kok from "./kok.json";
import bn from "./bn.json";
import or_ from "./or.json";
import merry from "./merry.json";
import ks from "./ks.json";
import as_ from "./as.json";
import njz from "./njz.json";
import ao from "./ao.json";
import mni from "./mni.json";
import kha from "./kha.json";
import ta from "./ta.json";
import ml from "./ml.json";
import pa from "./pa.json";
import te from "./te.json";
import lus from "./lus.json";

const resources = {
  EN: { translation: en },
  AR: { translation: ar },
  BG: { translation: bg },
  CA: { translation: ca },
  CS: { translation: cs },
  DA: { translation: da },
  DE: { translation: de },
  ES: { translation: es },
  ET: { translation: et },
  FI: { translation: fi },
  FR: { translation: fr },
  HR: { translation: hr },
  HU: { translation: hu },
  IT: { translation: it },
  JA: { translation: ja },
  KO: { translation: ko },
  LT: { translation: lt },
  NL: { translation: nl },
  NO: { translation: no },
  PT: { translation: pt },
  RO: { translation: ro },
  RU: { translation: ru },
  SV: { translation: sv },
  UK: { translation: uk },
  VI: { translation: vi },
  ZH: { translation: zh },
  KN: { translation: kn },
  HI: { translation: hi },
  GU: { translation: gu },
  MR: { translation: mr },
  KOK: { translation: kok },
  BN: { translation: bn },
  OR: { translation: or_ },
  MERRY: { translation: merry },
  KS: { translation: ks },
  AS: { translation: as_ },
  NJZ: { translation: njz },
  AO: { translation: ao },
  MNI: { translation: mni },
  KHA: { translation: kha },
  TA: { translation: ta },
  ML: { translation: ml },
  PA: { translation: pa },
  TE: { translation: te },
  LUS: { translation: lus },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN",
  fallbackLng: "EN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
