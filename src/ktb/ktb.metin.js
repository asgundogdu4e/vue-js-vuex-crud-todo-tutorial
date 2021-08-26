/* eslint-disable */function str__Cumlede_Var_Mi(pCumle, pAranan) {
    pCumle = new String(pCumle);
    return pCumle.indexOf(pAranan) > -1;
}

function str__DenItibaren(pCumle, pAranan) {
    let netice = "";
    if (str__Cumlede_Var_Mi(pCumle, pAranan)) {
        netice = pCumle.substring(pCumle.indexOf(pAranan));
    }
    return netice;
}

function str__KacAdetVar(pCumle, pAranan) {
    return pCumle.split(pAranan).length - 1;
}

function str__NincininPozisyonu(pCumle, pAranan, pNinci) {
    return pCumle.split(pAranan, pNinci).join(pAranan).length;
}

function str__DenSonraki(pCumle, pAranan) {
    let netice = "";
    const yeniCumle = str__DenItibaren(pCumle, pAranan);
    if (doluMu(yeniCumle)) {
        netice = yeniCumle.substring(pAranan.length);
    }
    return netice;
}

function str__E_KadarGetirHaric(pCumle, pAranan) {
    let netice = "";
    if (str__Cumlede_Var_Mi(pCumle, pAranan)) {
        netice = pCumle.substring(0, pCumle.indexOf(pAranan));
    }
    return netice;
}

function str__IkiSabitArasiGetirDahil() { }

function str__IkiSabitArasiGetirHaric(pCumle, pIlkSabit, pIkinciSabit) {
    let netice = "";
    //console.log(".: str__IkiSabitArasiGetirHaric() :.");
    //console.log("Cümle...: ", pCumle);
    //console.log("Var Mı?.: ", str__Cumlede_Var_Mi(pCumle, pIlkSabit), str__Cumlede_Var_Mi(pCumle, pIkinciSabit));
    if (
        str__Cumlede_Var_Mi(pCumle, pIlkSabit) &
        str__Cumlede_Var_Mi(pCumle, pIkinciSabit)
    ) {
        const yeniCumle = str__DenSonraki(pCumle, pIlkSabit);
        netice = str__E_KadarGetirHaric(yeniCumle, pIkinciSabit);
    }
    return netice;
}

function karakterleDoldur(pKarakter, pAdet) {
    pKarakter = pKarakter + "";
    return pKarakter.repeat(pAdet);
}
function sagaYasla(pStr, pAdet, pDoldurulacak = "0") {
    pStr = pStr + "";
    const eksikKarakter = pAdet - pStr.length;
    //console.log("pStr...: ", pStr);
    //console.log("Eksik Karakter...: ", eksikKarakter);
    if (eksikKarakter > 0) {
        return karakterleDoldur(pDoldurulacak, eksikKarakter) + pStr;
    } else {
        return pStr;
    }
}

function doluMu(pKiymet) {
    if (pKiymet !== null) {
        if (typeof pKiymet !== "undefined") {
            if (typeof pKiymet !== "NaN") {
                if (typeof pKiymet !== "object") {
                    pKiymet = pKiymet + '';
                    if (pKiymet.trim().length > 0) {
                        //console.log('doluMu 2', pKiymet);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function str__doluDegilseBosluk(pKiymet) {
    if (doluMu(pKiymet)) {
        return pKiymet
    } else {
        return ""
    }
}

function str__doluDegilseSifir(pKiymet) {
    if (doluMu(pKiymet)) {
        return pKiymet
    } else {
        return 0
    }
}
/* function doluMu2(pKiymet) {
    if (pKiymet === undefined || pKiymet === null) {
        return false;
    }
    if (pKiymet.trim().length > 0) {
        return true;
    } else {
        return false;
    }
} */

module.exports = {
    sagaYasla,
    karakterleDoldur,
    doluMu,
    str__Cumlede_Var_Mi,
    str__E_KadarGetirHaric,
    str__DenSonraki,
    str__DenItibaren,
    str__IkiSabitArasiGetirHaric,
    str__IkiSabitArasiGetirDahil,
    str__KacAdetVar,
    str__NincininPozisyonu,
    str__doluDegilseBosluk,
    str__doluDegilseSifir
};
