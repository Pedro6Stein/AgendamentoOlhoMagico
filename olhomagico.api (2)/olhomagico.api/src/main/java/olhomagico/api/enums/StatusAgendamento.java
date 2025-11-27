package olhomagico.api.enums;

public enum StatusAgendamento {

    AGENDADO("Agendado"),
    CONFIRMADO("Confirmado pelo Cliente"),
    EM_ANDAMENTO("Em Andamento"),
    CONCLUIDO("Concluído"),

    // Status de cancelamento/falha:
    CANCELADO("Cancelado pelo Cliente"),
    REAGENDADO("Reagendado"),
    NAO_COMPARECEU("Não Compareceu");

    private final String descricao;

    StatusAgendamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
