package org.hp.springtransaction.simple.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserServiceImpl implements UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void updateVersion() {
        jdbcTemplate.update("update ai_bill_base_dict set version=version+1 where id=?", "ticketBaseDict00001");
        System.out.println("更新完成");
    }
}
