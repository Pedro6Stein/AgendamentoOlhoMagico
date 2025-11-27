package olhomagico.api.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import olhomagico.api.enums.StatusAgendamento;

@Entity
@Data
@Getter
@Setter

public class Agendamento {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeCliente;
    private String email;
    private String telefone;
    private String dataAgendamento;
    private String servicoDesejado;
    private String modeloVeiculo;
    private String placaVeiculo;
    private Integer anoVeiculo;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;





}


