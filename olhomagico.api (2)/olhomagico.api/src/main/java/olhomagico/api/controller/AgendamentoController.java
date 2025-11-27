package olhomagico.api.controller;


import olhomagico.api.model.Agendamento;
import olhomagico.api.repositories.AgendamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoController(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Agendamento agendamento) {


        if (agendamento.getNomeCliente() == null || agendamento.getPlacaVeiculo() == null
                || agendamento.getTelefone() == null) {


            return new ResponseEntity("Dados obrigatórios (Nome, Placa e Telefone) estão faltando.", HttpStatus.BAD_REQUEST);
        }

        try {

            Agendamento novoAgendamento = agendamentoRepository.save(agendamento);


            return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);

        } catch (Exception e) {
            System.err.println("Erro ao salvar: " + e.getMessage());
            return new ResponseEntity("Erro interno ao processar agendamento.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> obterTodosAgendamentosSemToken() {

        try {

            List<Agendamento> agendamentos = agendamentoRepository.findAll();

            return new ResponseEntity<>(agendamentos, HttpStatus.OK);

        } catch (Exception e) {

            System.err.println("Erro ao buscar registros de agendamento: " + e.getMessage());

            return new ResponseEntity("Erro interno ao acessar o banco de dados H2.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}