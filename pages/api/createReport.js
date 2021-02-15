const allFields = [
  'Nº da Ocorrência',
  'Data da Ocorrência',
  'Contato do Responsável pela Abertura',
  'Telefone da Unidade',
  'Municípios',
  'Localidades',
  'Setores Comerciais Afetados',
  'Ligações Impactadas',
  'Objeto da Ocorrência',
  'Motivo da Paralisação',
  'Comunica Ocorrência à população?',
  'Riscos da Ocorrência',
  'Ações Adotadas',
  'Previsão de Equilíbrio',
  'Responsável pelo Fechamento',
  'Duração',
  'Data de Abertura',
  'Responsável pela Abertura',
  'Unidade',
  'Distritos',
  'Bairros Afetados',
  'Tipo de Ocorrência',
  'Agente Causador',
  'Detalhamento da Paralisação',
  'Implicações da Ocorrência',
  'Previsao de Conclusão',
  'Data de Fechamento',
  'Data de Equilíbrio'
]

export default function createReport(item) {
  return {
    y: item.y,
    nextReport: null,
    items: [],
    calculatedReport: {},
    calculateItems() {
      let currentField = this.items[0].text;

      this.items.forEach((item) => {
        if (allFields.includes(item.text)) {
          currentField = item.text;
          this.calculatedReport[currentField] = ''
        } else {
          this.calculatedReport[currentField] = [this.calculatedReport[currentField], item.text].filter((value) => value !== '').join('')
        }
      })
    }
  }
}