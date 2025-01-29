import { useState } from 'react';

const SKUGenerator = () => {
    const [generatedSKU, setGeneratedSKU] = useState('');
    const [inputSKU, setInputSKU] = useState('');
    const [decodedSKU, setDecodedSKU] = useState<Record<string, string>>({});

    const data = {
        conta: ['GrupoSixLLP'],
        squad: ['Delta', 'Echo'],
        produto: [
            'SUGARSIX', 'FLORASLIM', 'PROSTASLIM', 'ENDOPOWERPRO', 'LIPOGUMMIES',
            'FLORALEAN', 'ALPHAGUMMY', 'PUREGUTPRO', 'NERVEBLISS', 'BACKSHIFTPRO'
        ],
        vsl: ['VSL1', 'VSL2', 'VSL3', 'VSL4', 'VSL5', 'VSL6', 'VSL7', 'VSL8', 'VSL9', 'VSL10'],
        rede: ['FACEBOOK', 'GOOGLE', 'SEARCH', 'NATIVE', 'AFILIADOS', 'CALLCENTER', 'EMAIL', 'SMS'],
        tipo_de_venda: ['FRONT', 'BACKREDIRECT', 'UPSELL', 'DOWNSELL', 'CALL'],
        kit: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        preco: [
            '5','19', '29', '39', '49', '59', '69', '79', '89', '99',
            '109', '119', '129', '147', '149', '177', '198', '234', '261', '294', '351'
        ]
    };

    const [selectedValues, setSelectedValues] = useState({
        conta: data.conta[0],
        squad: data.squad[0],
        produto: data.produto[0],
        vsl: data.vsl[0],
        rede: data.rede[0],
        tipo_de_venda: data.tipo_de_venda[0],
        kit: data.kit[0],
        preco: data.preco[0]
    });

    const generateSKU = () => {
        const indexes = {
            A: data.conta.indexOf(selectedValues.conta) + 1,
            B: data.squad.indexOf(selectedValues.squad) + 1,
            C: data.produto.indexOf(selectedValues.produto) + 1,
            D: data.vsl.indexOf(selectedValues.vsl) + 1,
            E: data.rede.indexOf(selectedValues.rede) + 1,
            F: data.tipo_de_venda.indexOf(selectedValues.tipo_de_venda) + 1,
            G: data.kit.indexOf(selectedValues.kit) + 1,
            H: selectedValues.preco
        };

        const sku = `A${indexes.A}B${indexes.B}C${indexes.C}D${indexes.D}E${indexes.E}F${indexes.F}G${indexes.G}H${indexes.H}`;
        setGeneratedSKU(sku);
    };

    const decodeSKU = (sku: string) => {
        try {
            const pattern = /A(\d+)B(\d+)C(\d+)D(\d+)E(\d+)F(\d+)G(\d+)H(\d+)/;
            const matches = sku.match(pattern);

            if (!matches) {
                throw new Error('SKU inválido');
            }

            const decoded = {
                conta: data.conta[parseInt(matches[1]) - 1],
                squad: data.squad[parseInt(matches[2]) - 1],
                produto: data.produto[parseInt(matches[3]) - 1],
                vsl: data.vsl[parseInt(matches[4]) - 1],
                rede: data.rede[parseInt(matches[5]) - 1],
                tipo_de_venda: data.tipo_de_venda[parseInt(matches[6]) - 1],
                kit: data.kit[parseInt(matches[7]) - 1],
                preco: matches[8]
            };

            setDecodedSKU(decoded);
        } catch (error) {
            setDecodedSKU({ error: 'SKU inválido' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerador de SKU EUA</h1>
                <p className="text-gray-600 mt-2">v1.0.0</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Gerador Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Gerador de SKU
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Selecione as opções para gerar um novo SKU</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(data).map(([key, options]) => (
                            <div key={key} className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{key.toUpperCase()}</label>
                                <select
                                    className="w-full p-2.5 border border-gray-200 rounded-lg bg-white 
                                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                             hover:border-blue-300 transition-colors duration-200"
                                    value={selectedValues[key as keyof typeof selectedValues]}
                                    onChange={(e) => setSelectedValues(prev => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))}
                                >
                                    {options.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <button
                        className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg
                                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 focus:ring-offset-2 transition-colors duration-200 font-medium"
                        onClick={generateSKU}
                    >
                        Gerar SKU
                    </button>

                    {generatedSKU && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-600 mb-1">SKU Gerado:</p>
                            <p className="font-mono text-lg font-semibold text-blue-800">{generatedSKU}</p>
                        </div>
                    )}
                </div>

                {/* Leitor Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Leitor de SKU
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Digite um SKU para decodificar suas informações</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Digite o SKU para decodificar"
                        className="w-full p-3 border border-gray-200 rounded-lg 
                                 focus:ring-2 focus:ring-green-500 focus:border-green-500
                                 hover:border-green-300 transition-colors duration-200"
                        value={inputSKU}
                        onChange={(e) => setInputSKU(e.target.value)}
                    />

                    <button
                        className="mt-4 w-full bg-green-600 text-white py-3 px-4 rounded-lg
                                 hover:bg-green-700 focus:outline-none focus:ring-2 
                                 focus:ring-green-500 focus:ring-offset-2 transition-colors 
                                 duration-200 font-medium"
                        onClick={() => decodeSKU(inputSKU)}
                    >
                        Decodificar SKU
                    </button>

                    {Object.keys(decodedSKU).length > 0 && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                            <p className="text-sm text-green-600 mb-2">Resultado da decodificação:</p>
                            <div className="space-y-2">
                                {Object.entries(decodedSKU).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-1 border-b border-green-100 last:border-0">
                                        <span className="font-medium text-gray-700">{key}:</span>
                                        <span className="font-mono text-green-800">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SKUGenerator;
