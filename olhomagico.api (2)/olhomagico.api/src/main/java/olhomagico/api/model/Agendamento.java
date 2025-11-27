package olhomagico.api.model;

import jakarta.persistence.*;
import lombok.Data;

import olhomagico.api.enums.StatusAgendamento;

@Entity
@Data 
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String email;
    
    @Column(name = "telefone_cliente")
    private String telefoneCliente; 

    private String dataAgendamento;
    private String servicoDesejado;
    private String marcaModelo; 
    private String placaVeiculo;
    private Integer anoVeiculo;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;
}