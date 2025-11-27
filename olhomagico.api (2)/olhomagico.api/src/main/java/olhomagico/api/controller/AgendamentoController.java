package olhomagico.api.controller;

import olhomagico.api.model.Agendamento;
import olhomagico.api.repositories.AgendamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoController(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Agendamento agendamento) {
        
        if (agendamento.getNomeCliente() == null || agendamento.getTelefoneCliente() == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        try {
            Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
            return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Erro ao salvar: " + e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> obterTodosAgendamentos() {
        
        try {
            List<Agendamento> agendamentos = agendamentoRepository.findAll();
            return new ResponseEntity<>(agendamentos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}