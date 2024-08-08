package com.example.infihubz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.infihubz.model.ManageFood;
import com.example.infihubz.repository.ManageFoodRepo;

@Service
public class ManageFoodService {

    @Autowired
    private ManageFoodRepo mfr;

    public ManageFood addNewFood(ManageFood mf) {
        return mfr.save(mf);
    }

    public List<ManageFood> fetch() {
        return mfr.findAll();
    }

    public void delFood(Long id) {
        mfr.deleteById(id);
    }
}
