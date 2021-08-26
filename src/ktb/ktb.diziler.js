/* eslint-disable */
const Metin = require("./ktb.metin");

/**
 *
 * @param {*} pStr
 *
 * "1, 2, 3, 4, 5" => [1, 2, 3, 4, 5]
 *
 */
function strToIntegerArray(pStr) {
    const dizi = pStr.split(",");
    let netice = [];
    dizi.forEach((element) => {
        const pkiymet = parseInt(element, 10);
        if (pkiymet) {
            netice.push(pkiymet);
        }
    });
    return netice;
}

function integerArrayToStr(pIntegerArray) {
    let netice = "";
    pIntegerArray.forEach((element) => {
        const kiymet = String(element);
        if (Metin.doluMu(kiymet)) {
            netice += kiymet + ", ";
        }
    });
    return netice;
}

function strToStringArray(pStr) {
    const netice = pStr.split(",").map(function (item) {
        return String(item);
    });
    return netice;
}

function diziyeElemanEkle(pDizi, pEleman) {
    pDizi.push(pEleman);
}

function dizidenElemanSil(pDizi, pEleman, pAlan) {
    let dizi = ObjectDenDizi(Object.assign({}, pDizi));
    let siraNo = dizi.findIndex((eleman) => {
        //console.log(eleman[pAlan], pEleman[pAlan]);
        return eleman[pAlan] === pEleman[pAlan]
    });
    dizi.splice(siraNo, 1);
    return dizi;
}

function dizininBasinaElemanEkle(pDizi, pEleman) {
    pDizi.unshift(pEleman);
}

function ObjectDenDizi(pObject) {
    let netice = new Array();
    Object.keys(pObject).map(function (key) {
        netice.push(pObject[key]);
    });
    return netice;
}

function diziyeElemanEkleSirala(
    pDizi,
    pEleman,
    pSiralanacakAlan,
    pArtan = true
) {
    let dizi = ObjectDenDizi(Object.assign({}, pDizi));
    dizi.push(Object.assign({}, pEleman));
    if (pArtan) {
        dizi.sort(dynamicSortTR(pSiralanacakAlan));
    } else {
        dizi.sort(dynamicSortTR_Azalan(pSiralanacakAlan));
    }
    return dizi;
}

function dynamicSortTR(property) {
    return function (a, b) {
        return a[property].toString().localeCompare(b[property]);
    };
}

function dynamicSortTR_Azalan(property) {
    return function (a, b) {
        return b[property].toString().localeCompare(a[property]);
    };
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}

function diziyiSirala(pDizi, pAlan) {
    pDizi.sort(dynamicSortTR(pAlan));
}

function dizininElemaniniGuncelleSirala(pDizi, pEleman, pSiralanacakAlan) {
    let dizi = ObjectDenDizi(Object.assign({}, pDizi));
    const siraNo = dizi.findIndex((eleman) => eleman.id === pEleman.id);
    dizi[siraNo] = Object.assign({}, pEleman);
    dizi.sort(dynamicSortTR(pSiralanacakAlan));
    return dizi;
}

function siraNoBul(dizi, alan, deger) {
    return dizi.findIndex((veri) => veri[alan] === deger);
}

function dizideidDanBulVeriGetir(pDizi, pid) {
    let netice = "";
    const siraNo = pDizi.findIndex((eleman) => eleman.id === pid);
    if (siraNo > -1) {
        netice = pDizi[siraNo].veri;
    }
    return netice;
}

function dizideVeriBulAlanGetir(
    pDizi,
    pGeriDonecekAlan,
    pAranacakAlan,
    pAranacakVeri
) {
    let netice = "";
    if (Array.isArray(pDizi)) {
        const siraNo = pDizi.findIndex(
            (eleman) => eleman[pAranacakAlan] === pAranacakVeri
        );
        if (siraNo > -1) {
            netice = pDizi[siraNo][pGeriDonecekAlan];
        }
    }
    return netice;
}


function dizideVeriBulElemanGetir
    (
        pDizi,
        pAranacakAlan,
        pAranacakVeri
    ) {
    let netice = "";
    if (Array.isArray(pDizi)) {
        const siraNo = pDizi.findIndex(
            (eleman) => eleman[pAranacakAlan] === pAranacakVeri
        );
        if (siraNo > -1) {
            netice = pDizi[siraNo];
        }
    }
    return netice;
}

module.exports = {
    diziyeElemanEkle,
    dizidenElemanSil,
    diziyeElemanEkleSirala,
    dizininBasinaElemanEkle,
    ObjectDenDizi,
    diziyiSirala,
    dizininElemaniniGuncelleSirala,
    dizideidDanBulVeriGetir,
    dizideVeriBulAlanGetir,
    dizideVeriBulElemanGetir,
    siraNoBul,
    integerArrayToStr,
    strToStringArray,
    strToIntegerArray,
};
